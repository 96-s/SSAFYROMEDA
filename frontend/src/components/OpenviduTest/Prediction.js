import React, { useState, useEffect } from "react";
import * as tmImage from "@teachablemachine/image";

/*
******** 참고 ********
가위바위보 는 클래스 순서
1. 가위
2. 바위
3. 보

행동 클래스 순서
1. Start 전 Sit 자세
2. X
3. O
4. NoFace
*/

export default function Predict(props) {
  ////////////////////////////// 가위 바위 보 인식  //////////////////////////////
  const URL = "https://teachablemachine.withgoogle.com/models/kFcpZZQB8/";

  let model, webcam, labelContainer, maxPredictions;
  let count = 0;
  let count_behavior = 0;
  const [gametype, setGametye] = useState(randomNumberInRange(0, 2));
  function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  ////////////////////////////// O, X, None face  //////////////////////////////
  const URL_behavior =
    "https://teachablemachine.withgoogle.com/models/JThpKqQ5c/";

  let model_behavior,
    webcam_behavior,
    labelContainer_behavior,
    maxPredictions_behavior;
  const [gametype_behavior, setGametye_behavior] = useState(
    randomNumberInRange_behavior(0, 3)
  );
  function randomNumberInRange_behavior(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  ////////////////////////////// 가위 바위 보 인식 Function Start  //////////////////////////////

  async function init() {
    if (count === 100) {
      count = 0;
      setGametye(randomNumberInRange(0, 2));
    }
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    const flip = true;
    webcam = new tmImage.Webcam(200, 200, flip);
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loop);
    console.log(gametype, "에 들어가자");
  }

  async function loop() {
    webcam.update();

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
    }
    window.requestAnimationFrame(loop);
  }

  async function predict() {
    const prediction = await model.predict(webcam.canvas);
    // console.log(prediction[gametype].probability);
    if (prediction[gametype].probability > 0.8) {
      console.log("접속");
      count = count + 1;
      console.log(count);

      if (count === 100) {
        console.log("COMPLETE");
      }
    }
  }
  ////////////////////////////// O, X, None face  Function Start //////////////////////////////
  async function init_behavior() {
    if (count_behavior === 100) {
      count_behavior = 0;
      setGametye_behavior(randomNumberInRange(0, 2));
    }
    const modelURL_behavior = URL_behavior + "model.json";
    const metadataURL_behavior = URL_behavior + "metadata.json";

    model_behavior = await tmImage.load(
      modelURL_behavior,
      metadataURL_behavior
    );
    maxPredictions_behavior = model_behavior.getTotalClasses();

    const flip = true;
    webcam_behavior = new tmImage.Webcam(200, 200, flip);
    await webcam_behavior.setup();
    await webcam_behavior.play();
    window.requestAnimationFrame(loop_behavior);
    console.log(gametype_behavior, "에 들어가자");
  }

  async function loop_behavior() {
    webcam_behavior.update();

    // eslint-disable-next-line default-case
    switch (gametype_behavior) {
      case 0:
        if (count_behavior !== 100) {
          await predict_behavior();
          break;
        }
        break;
      case 1:
        if (count_behavior !== 100) {
          await predict_behavior();
          break;
        }
        break;
      case 2:
        if (count_behavior !== 100) {
          await predict_behavior();
          break;
        }
        break;
      case 3:
        if (count_behavior !== 100) {
          await predict_behavior();
          break;
        }
    }
    window.requestAnimationFrame(loop_behavior);
  }

  async function predict_behavior() {
    const prediction_behavior = await model_behavior.predict(
      webcam_behavior.canvas
    );
    // console.log(prediction[gametype].probability);
    if (prediction_behavior[gametype_behavior].probability > 0.8) {
      console.log("접속");
      count_behavior = count_behavior + 1;
      console.log(count_behavior);

      if (count_behavior === 100) {
        console.log("COMPLETE");
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
        value="가위 바위 보"
      />
      <h2>number is: {gametype_behavior}</h2>
      <input
        className="btn btn-large btn-success"
        type="button"
        id="buttonSwitchCamera"
        onClick={init_behavior}
        value="Behavior"
      />
    </div>
  );
}
