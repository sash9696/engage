import React from 'react';
import './Login.css';
import {Button} from '@material-ui/core';
import { auth, provider } from './firebase';
import {signInWithPopup } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { login } from './features/appSlice';


function Login() {
    const dispatch = useDispatch()
    const signIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                dispatch(
                    login({
                        username: result.user.displayName,
                        profilePic: result.user.photoURL,
                        id: result.user.uid
                    })
                )
            })
            .catch((error)=> alert(error.message))

    }
  return (
    <div className='login'>
        <div className="login_container">
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_hfoztu7du8wsJFBJL4se8xTUbP19hS6pJw&usqp=CAU' alt='' />
            <Button onClick={signIn}>Sign In</Button>
        </div>
    </div>
    );
}

export default Login;
