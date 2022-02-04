import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './Chat.css';
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import { auth, db } from './firebase';
import SingleChat from './SingleChat';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './features/appSlice';
import { useNavigate } from 'react-router-dom';
import { logout } from './features/appSlice';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { resetCameraImage } from './features/cameraSlice';




function Chat() {

    const [posts, setPosts] = useState([]);
    const user = useSelector(selectUser);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const takeSnap = () => {
        dispatch(resetCameraImage())
        navigate('/')
    }

    useEffect(() =>{
        db.collection('posts')
          .orderBy('timestamp', 'desc')
          .onSnapshot(snapshot => setPosts(snapshot.docs.map(doc => (
              {
                  id: doc.id,
                  data: doc.data()
              }
          ))) )
          return () => {

        }


    }, [])
    const signOut = () => {
        auth.signOut();
        dispatch(logout())
        
    } 

  return (
    <div className='chat'>
        <div className="chat_header">
            <Avatar src={user.profilePic} onClick={signOut} className='chat_avatar'/>
            <div className="chat_search">
                <SearchIcon/>
                <input type='text' placeholder='Friends'/>
            </div>
            <ChatBubbleIcon className='chat_chatIcon'/>
        </div>
        <div className="chat_posts">
            {posts.map(({id, data:{username, timestamp, imageUrl, read, profilePic}}) => (
                <SingleChat
                    key={id}
                    id={id}
                    username={username}
                    timestamp={timestamp}
                    imageUrl={imageUrl}
                    read={read}
                    profilePic={profilePic}
                />
            ))}
        </div>
        <RadioButtonUncheckedIcon
          onClick={takeSnap}
          className='takePic_button'
          fontSize='large'
        />
    </div>
    );
}

export default Chat;
