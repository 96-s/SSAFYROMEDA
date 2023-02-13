import React, { useState, useEffect } from 'react';
import * as tmImage from '@teachablemachine/image';

export default function Predict(props) {
  const URL = 'https://teachablemachine.withgoogle.com/models/kFcpZZQB8/';

  let model, webcam, labelContainer, maxPredictions;
  let count = 0;

  const [gametype, setGametye] = useState(randomNumberInRange(0, 2));
  function randomNumberInRange(min, max) {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async function init() {
    if (count === 100) {
      count = 0;
      setGametye(randomNumberInRange(0, 2));
    }
    const modelURL = URL + 'model.json';
    const metadataURL = URL + 'metadata.json';

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);
    console.log(gametype, "에 들어가자");
    // append elements to the DOM
    // document.getElementById('webcam-container').appendChild(webcam.canvas);
    // labelContainer = document.getElementById('label-container');
    // for (let i = 0; i < maxPredictions; i++) {
    //   // and class labels
    //   labelContainer.appendChild(document.createElement('div'));
    // }
  }

  async function loop() {
    webcam.update(); // update the webcam frame
    // console.log(gametype); 
   
    // eslint-disable-next-line default-case
    switch (gametype) {
      
      case 0:
        if (count !== 100) {
          
          await predict();
          break;
        }
        break;
      case 1:
        if (count !== 100) {
          
          await predict();
          break;
        }
        break;
      case 2:
        if (count !== 100) {
         
          await predict();
          break;
        }
        break;
      case 4:
        if (count !== 100) {
         
          await predict();
          break;
        }
    }
    window.requestAnimationFrame(loop);
  }

  //   const ChangeResultto0 = (e) => {
  //     document.getElementById('label-container').style.display = 'none';
  //     setResult(0);
  //   };
  //   //Teachable Machine에서 predict를 통해서 분류 진행
  async function predict() {
    const prediction = await model.predict(webcam.canvas);
    // console.log(prediction[gametype].probability);
    if (prediction[gametype].probability > 0.8) {
      console.log('접속');
      count = count + 1;
      console.log(count);

      if (count === 100) {
        console.log('COMPLETE');
      }
    }
  }

  return (
    <div>
      <h2>number is: {gametype}</h2>
      <input
        className="btn btn-large btn-success"
        type="button"
        id="buttonSwitchCamera"
        onClick={init}
        value="Switch AI"
      />
    </div>
  );
}
