import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { register } from '../actions/userAction';

const Register = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const userRegister = useSelector(state => state.userRegister);
    const { loading, userInfo, error} = userRegister;
    const dispatch = useDispatch();

    useEffect( () =>{
       if(userInfo) {
        props.history.push('/')
       }
       
    }, [userInfo, props.history] ); 

    const submitHandler = (e)=> {
        e.preventDefault();
        if(password2 === password) {
            dispatch(register(name, email, password));

            console.log('Registered succesfuly')
        }else {alert('Please match passwords')}
    }

    return (
        <div className="form">
           <form onSubmit={submitHandler}>
               <div className="form-container">
                   <h2>Register</h2>

                    {loading && <div>Loading..</div>}
                    {error && <div>Please provide valid data for all the fields</div>}
                    
                    <label htmlFor="name">Name</label>
                    <input type="name" name="name" id="name" onChange={e => setName(e.target.value)} /> 

                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} /> 

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} />

                    <label htmlFor="password2">Re_Enter Password</label>
                    <input type="password22" name="password2" id="password2" onChange={e => setPassword2(e.target.value)} />

                    <button type="submit" className="primary">
                        Register
                    </button>

                    <span>Alredy have an account?</span>

                    <div className="secondary" >
                        <Link to="/signin">Sign-in </Link>
                    </div>
               </div>
           </form>
        </div>
    )
}

export default Register;