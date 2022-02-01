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
import firebase from 'firebase/app';



function Preview() {

    const cameraImage = useSelector(selectCameraImage);
    const navigate = useNavigate();
    const dispatch = useDispatch();
   
    const closePreview = () =>{
        dispatch(resetCameraImage())
    }
    const sendPost = () =>{
        const id = uuid();
        console.log("working")
        
    

    }
  
    useEffect(() => {
        if(!cameraImage)
        {
            navigate('/');
        }

    },[cameraImage, navigate])
  return (
        <div className='preview'>
            <CloseIcon onClick={closePreview} className='preview_closeIcon'/>
            <div className="preview_toolbarRight">
                <TextFieldsIcon/>
                <CreateIcon/>
                <NoteIcon/>
                <MusicNoteIcon/>
                <AttachFileIcon/>
                <CropIcon/>
                <TimerIcon/>
            </div>
            <img src={cameraImage} alt=''/>
            <div onClick={sendPost} className="preview_footer">
                <h4>Send Now</h4>
                <SendIcon  className='preview_sendIcon' />
            </div>
        </div>
    );
    }

export default Preview;
