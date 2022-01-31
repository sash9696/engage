import React, { useRef,useCallback, useState } from 'react';
import './WebcamCapture.css';
import WebCam from'react-webcam';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useDispatch } from 'react-redux';
import { setCameraImage } from './features/cameraSlice';

const videoConstraints = {
    width:250,
    height:400,
    facingMode: 'user'
}



function WebcamCapture() {
  // const [image, setImage] = useState(null);
  const webcamRef = useRef(null);
  const dispatch = useDispatch();
  const capture = useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      dispatch(setCameraImage(imageSrc));
      // console.log(imageSrc)
      // setImage(imageSrc);
    },
    [webcamRef]
  );
  return( 
    <div className='capture'>
        <WebCam
            audio={false}
            screenshotFormat='image/jpeg'
            height={videoConstraints.height}
            width={videoConstraints.width}
            videoConstraints={videoConstraints}
            ref = {webcamRef}
        />   
        <RadioButtonUncheckedIcon
          onClick={capture}
          className='webcamCapture_button'
          fontSize='large'
        />
        {/* <img src={image} alt=''/> */}
    </div>
  );
}

export default WebcamCapture;
