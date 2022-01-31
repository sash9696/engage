import React from 'react';
import './App.css';
import WebcamCapture from './WebcamCapture';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Preview from './Preview';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WebcamCapture/>} />
          <Route path="/preview" element={<Preview />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
