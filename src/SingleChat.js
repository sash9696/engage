import { Avatar } from '@material-ui/core';
import React from 'react';
import './SingleChat.css'
import StopRoundedIcon from '@material-ui/icons/StopRounded'

function SingleChat({username, timestamp, imageUrl, read, profilePic}) {
  return (
    <div className='singleChat'>
        <Avatar className='singleChat_avatar' src={profilePic}/>
        <div className="singleChat_info">
            <h4>{username}</h4>
            <p>Tap to view - {new Date(timestamp?.toDate()).toUTCString()}</p>
        </div>
        {!read && <StopRoundedIcon className='singleChat_icon'/> }

    </div>
    
    );
}

export default SingleChat;
