import React from 'react'
import "./Header.css"
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
function Header() {

    const [{ cart, user }, dispatch] = useStateValue();

    const handleAuthentication = (e) => {
        // e.preventDefault();
        if (user) {
            auth.signOut();
        }
    }
    return (
        <div className="header">
            <Link to="/">
                <img className="header_logo" src="https://boostedmedia.net/wp-content/uploads/2019/11/white-amazon-logo-png-6.png" alt="AMAZON" />
            </Link>

            <div className="header_search">
                <input type="text" className="header_searchInput" />
                <SearchIcon className="header_searchIcon" />
            </div>

            <div className="header_nav">
                <Link to={!user && "/login"}>
                    <div onClick={handleAuthentication} className='header_option'>
                        <span className="header_optionLineOne">Hello {!user ? "Guest" : user.email}</span>
                        <span className="header_optionLineTwo">{user ? "Sign Out" : "Sign In"}</span>
                    </div>
                </Link>
                <Link to="/orders">
                    <div className='header_option'>
                        <span className="header_optionLineOne">Returns</span>
                        <span className="header_optionLineTwo">& Orders</span>
                    </div>
                </Link>
                <div className='header_option'>
                    <span className="header_optionLineOne">Your</span>
                    <span className="header_optionLineTwo">Prime</span>
                </div>
                <Link to="/checkout">
                    <div className='header_optionBasket'>
                        <ShoppingCartIcon />
                        <span className="header_optionLineTwo header_basketCount">{cart?.length}</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header