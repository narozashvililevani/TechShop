import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { signin } from '../actions/userAction';

const Signin = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error} = userSignin;
    const dispatch = useDispatch();

    useEffect( () =>{
       if(userInfo) {
        props.history.push('/')
       }
       
    }, [userInfo, props.history] ); 

    const submitHandler = (e)=> {
        e.preventDefault();

        dispatch(signin(email, password));
    }

    return (
        <div className="form">
           <form onSubmit={submitHandler}>
               <div className="form-container">
                   <h2>Sign-In</h2>

                    {loading && <div>Loading..</div>}
                    {error && <div>Please enter valid email and password.</div>}

                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} /> 

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} />

                    <button type="submit" className="primary">
                        Signin
                    </button>

                    <span>New to techshop ?</span>

                    <div className="secondary" >
                        <Link to="/register">Create your techshop Account </Link>
                    </div>
               </div>
           </form>
        </div>
    )
}

export default Signin;