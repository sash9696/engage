import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './Chat.css';
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import { db } from './firebase';
import SingleChat from './SingleChat';


function Chat() {

    const [posts, setPosts] = useState([]);

    useEffect(() =>{
        db.collection('posts')
          .orderBy('timestamp', 'desc')
          .onSnapshot(snapshot => setPosts(snapshot.docs.map(doc => (
              {
                  id: doc.id,
                  data: doc.data()
              }
          ))) )


    }, [])
    console.log(posts)

  return (
    <div className='chat'>
        <div className="chat_header">
            <Avatar className='chat_avatar'/>
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
    </div>
    );
}

export default Chat;
