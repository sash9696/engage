import React,{useEffect} from 'react';
import './App.css';
import WebcamCapture from './WebcamCapture';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Preview from './Preview';
import Chat from './Chat';
import ChatView from './ChatView';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './features/appSlice';
import Login from './Login';
import { auth } from './firebase';
import { login } from './features/appSlice';

function App() {

  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser){
        dispatch(login({
          username: authUser.displayName,
          profilePic: authUser.photoURL,
          id: authUser.uid

        }))
      }
    })
  
    
  }, []);
  
  return (
    <div className="app">
      {!user ? <Login/> : (
        <>
          {/* <img className='' src='https://i.graphicmama.com/blog/wp-content/uploads/2019/10/08140842/Best-Photography-Logo-Ideas-Example-Carrie-Chase-Photography-Logo.jpg' alt=''/> */}
          <div className="app_body">
            <div className="app_bodyBackground">
              <BrowserRouter>
              <Routes>
                <Route path="/" element={<WebcamCapture/>} />
                <Route path="/preview" element={<Preview />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/chat/view" element={<ChatView />} />
              </Routes>
            </BrowserRouter>
            </div>
          
          </div>
          
        </>
        
      
      )}
      
    </div>
  );
}

export default App;
