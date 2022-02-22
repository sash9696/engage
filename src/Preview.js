import React, { useEffect } from 'react';
import './Preview.css';
import { useSelector } from 'react-redux';
import { selectCameraImage } from './features/cameraSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetCameraImage } from './features/cameraSlice';
import CloseIcon from '@material-ui/icons/Close';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CreateIcon from '@material-ui/icons/Create';
import NoteIcon from '@material-ui/icons/Note';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CropIcon from '@material-ui/icons/Crop';
import TimerIcon from '@material-ui/icons/Timer';
import SendIcon from '@material-ui/icons/Send';
import {v4 as uuid} from "uuid";
import { db } from './firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firestore from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadString } from "firebase/storage";
import { selectUser } from './features/appSlice';
import Filter from './Filter';


function Preview() {

    const cameraImage = useSelector(selectCameraImage);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    
    useEffect(() => {
      if(!cameraImage)
      {
          navigate('/');
      }
      return () => {

      }
  },[cameraImage, navigate])
   
    const closePreview = () =>{
        dispatch(resetCameraImage())
    }
    const sendPost = () =>{
        const id = uuid();
        console.log("working")
        

const storage = getStorage();
const metadata = {
    contentType: 'image/jpeg'
  };
const storageRef = ref(storage, `posts/${id}`);
uploadString(storageRef, cameraImage, 'data_url').then((snapshot) => {
    
  });
  const uploadTask = uploadBytesResumable(storageRef, cameraImage, metadata);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed',null , 
  (error) => {
    // Handle unsuccessful uploads
    console.log(error)
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadURL) => {
            
            db.collection('posts').add({
                imageUrl: downloadURL,
                username: user.username,
                read:false,
                profilePic: user.profilePic,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
            navigate('/chat')
    });
  }
);
 }
 
    
  return (
        <div className='preview'>
            <CloseIcon onClick={closePreview} className='preview_closeIcon'/>
            <div className="preview_toolbarRight">
                {/* <TextFieldsIcon/> */}
                {/* <Filter image={cameraImage} /> */}
                
                {/* <NoteIcon/> */}
                {/* <MusicNoteIcon/>
                <AttachFileIcon/>
                <CropIcon/>
                <TimerIcon/> */}
            </div>
            {/* <img src={cameraImage} alt=''/> */}
            <Filter image={cameraImage} />
            <div onClick={sendPost} className="preview_footer">
                <h4>Send Now</h4>
                <SendIcon  className='preview_sendIcon' />
            </div>
        </div>
    );
    }

export default Preview;
