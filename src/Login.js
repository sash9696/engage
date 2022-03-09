import React from 'react';
import './Login.css';
import {Button} from '@material-ui/core';
import { auth, provider, auth2 } from './firebase';
import {signInWithPopup } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { login } from './features/appSlice';
import { signInAnonymously } from "firebase/auth";


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
    //  const guest = () => {
    //     signInAnonymously(auth)
    //     .then(() => {
    //       // Signed in..
    //     })
    //     .catch((error) => {
    //       const errorCode = error.code;
    //       const errorMessage = error.message;
    //       // ...
    //     });
    //  }
    const guest = () => {
        auth2.signInWithEmailAndPassword('guest@gmail.com', "abcabc").then((userAuth) =>{
            
                dispatch(login({
                    username: "Guest User",
                    profilePic: userAuth?.user.photoURL || '',
                    id: userAuth?.user.uid,
                    
                }))
            })
        .catch((error) => alert(error));

        // auth2.signInWithEmailAndPassword("guest@gmail.com", "abcabc")
        // .then((userAuth)=>{
            
        //     dispatch(login({
        //         email: userAuth?.user.email,
        //         uid: userAuth?.user.uid,
        //         displayName: userAuth?.user.displayName,
        //     }))

        // }).catch((error) => {
        //     alert(error.message)
        // })
    }
  return (
    <div className='login'>
        <div className="login_container">
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_hfoztu7du8wsJFBJL4se8xTUbP19hS6pJw&usqp=CAU' alt='' />
            <Button onClick={signIn}>Sign In</Button>
            <Button onClick={guest} >Login as a Guest</Button>
        </div>
    </div>
    );
}

export default Login;
