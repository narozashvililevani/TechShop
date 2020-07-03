import React from 'react';
import { logout } from '../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';

function Profile (props) {

  const dispatch = useDispatch();

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  
  const handleLogout = () => {
    dispatch(logout());
    props.history.push("/signin");
  }


  return <div className="profile">

    <div className="profile-info">
        <h2>User Profile</h2> 

        <div className="wrapper">
            <img src="/imgs/profile.PNG" alt="default"/>

            <div className="info">
                <label htmlFor="name">Name: </label>
                <span>{userInfo.name}</span>

                <br></br>

                <label htmlFor="email">Email: </label>
                <span>{userInfo.email}</span>

                <br></br>

                <label htmlFor="admin">Privilege: </label>
                <span>{ userInfo.isAdmin ? 'Admin': 'Not admin'}</span>

                <div className="action">
                    <button type="" className="primary">Update</button>
                    
                    <button type="button" onClick={handleLogout} className="secondary">Logout</button>
                </div>
                
                <br></br>
                <small>Update is not provided</small>
            </div>

        </div>
    </div>
   
  </div>
}

export default Profile;