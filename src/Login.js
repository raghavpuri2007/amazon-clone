import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import "./Login.css"
import { auth } from "./firebase"

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password).then((auth) => {
            if (auth) {
                history.push('/')
            }
        }).alert(error => alert(error.message))
    }

    const register = e => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(email, password).then((auth) => {
            //it successfully created a new user with email and password
            console.log(auth);
            if (auth) {
                history.push('/')
            }
        }).catch(error => alert(error.message))
    }
    return (
        <div className="login">
            <Link to="/">
                <img className="login_logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png" />
            </Link>

            <div className="login_container">
                <h1>Sign in</h1>
                <form>
                    <h5>E-mail</h5>
                    <input value={email} type="email" onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" />

                    <button onClick={signIn} className='login_signInButton' type='submit'>Sign In</button>
                </form>
                <p>By signing-in you agree to the Amazon Clone's Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice</p>
                <button onClick={register} className='login_registerButton'>Create your Amazon Account</button>
            </div>
        </div>
    )
}

export default Login