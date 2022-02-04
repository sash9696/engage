import { Avatar } from '@material-ui/core';
import React from 'react';
import './SingleChat.css'
import StopRoundedIcon from '@material-ui/icons/StopRounded'
import ReactTimeago from 'react-timeago';
import { selectImage } from './features/appSlice';
import { useDispatch } from 'react-redux';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom';

function SingleChat({id, username, timestamp, imageUrl, read, profilePic}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const open = () => {
        if(!read){
            dispatch(selectImage(imageUrl));
            db.collection('posts').doc(id).set({
                read: true,
            }, {merge: true}
            );
            navigate('/chat/view')
        }
        
    }
  return (
    <div onClick={open} className='singleChat'>
        <Avatar className='singleChat_avatar' src={profilePic}/>
        <div className="singleChat_info">
            <h4>{username}</h4>
            <p>{!read ? "Tap to view" :("")} <ReactTimeago date= {new Date(timestamp?.toDate()).toUTCString()}/></p>
        </div>
        {!read && <StopRoundedIcon className='singleChat_icon'/> }

    </div>
    
    );
}

export default SingleChat;
