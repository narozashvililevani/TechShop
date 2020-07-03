import React from 'react';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Home from './Views/Home';
import Product from './Views//Product';
import Cart from './Views/Cart';
import Signin from './Views/Signin';
import Register from './Views/Register';
import ManageProducts from './Views/ManageProducts';
import Profile from './Views/Profile';
import About from './Views/About';

const App = () => {

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    
    // cart items display 
    const cartItems = useSelector(state => state.cart.cartItems);

    return (
    <BrowserRouter>
        <div className="grid-container">

            <header className="header">
                
                <div className="brand">
                        <Link to="/"><span>T</span>ech<span>S</span>hop</Link>
                    </div>

                    <div className="header-links">
                            <Link to="/ManageProducts">Admin</Link>

                            <Link to="/cart">Cart 
                                <span className="cart-amount">{cartItems.reduce((acum, curV ) => acum + Number(curV.qty) , 0 ) }</span>
                            </Link>

                            { userInfo ?  <Link to="/profile">{userInfo.name}</Link> :
                                <Link to="/signin">Sign In</Link> 
                            }
                            <Link to="/about">About</Link>
                    </div>
               
            </header>

            <main className="main">
                <div className="content">
                    <Route path="/" exact={true} component={Home} />
                    <Route path="/product/:id"  component={Product} />
                    <Route path="/cart/:id?"  component={Cart} />
                    <Route path="/signin"  component={Signin} />
                    <Route path="/register"  component={Register} />
                    <Route path="/ManageProducts"  component={ManageProducts} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/about" component={About} />
                </div>
            </main>

            <footer className="footer">
                &copy; L N
            </footer>

        </div>
    </BrowserRouter>
    )
};

export default App;