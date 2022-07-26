import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import "./Payment.css"
import { useStateValue } from './StateProvider'
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import CurrencyFormat from 'react-currency-format';
import { getCartTotal } from './reducer';
import axios from "./axios"
import { db } from './firebase';
import Address from './Address';

function Payment() {
    const [{ cart, user }, dispatch] = useStateValue();
    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory();
    const [succeeded, setSucceeded] = useState(false)
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState("")
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        //generate special stripe secret which allows us to charge a customer


        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                //stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getCartTotal(cart) * 100}`
            })
            setClientSecret(response.data.clientSecret);
        }

        getClientSecret();
    }, [cart])

    console.log("THE SECRET IS -> ", clientSecret)
    const handleSubmit = async event => {
        //stripe stuff
        event.preventDefault();
        setProcessing(true)


        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            //paymentIntent = paymentConfirmation

            db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set({
                cart: cart,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            })

            setSucceeded(true);
            setError(null)
            setProcessing(false)

            dispatch({
                type: "EMPTY_CART"
            })

            history.replace('/orders')
        })
    }

    const handleChange = e => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "")
    }
    return (
        <div className="payment">
            <div className="payment_container">
                <h1>
                    Checkout (<Link to="/checkout">{cart?.length} items</Link>)
                </h1>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment_address">
                        <Address />
                    </div>
                </div>

                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Review Items and delivery</h3>
                    </div>
                    <div className="payment_items">
                        {cart.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment_details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />

                            <div className='payment_priceContainer'>
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <>
                                            <h3>Order Total: {value}</h3>
                                        </>
                                    )}
                                    decimalScale={2}
                                    value={getCartTotal(cart)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>

                            {/* Errors */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Payment