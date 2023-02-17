# 🖼 Frontend


## 🔧 개발 환경
- Google Chrome Browser
- react 17.0.2
- reduxjs/toolkit 1.9.1
- redux-saga 1.2.2
- redux-persist 6.0.0
- styled-components 5.3.6
- openvidu-browser 2.25.0


## 📈 프로젝트 구조
```
📦src
┣ 📂components
┃ ┣ 📂auth
┃ ┃ ┣ 📜Login.js
┃ ┃ ┣ 📜OauthRedirect.js
┃ ┃ ┗ 📜SingUpForm.js
┃ ┣ 📂common
┃ ┃ ┣ 📜audio.js
┃ ┃ ┣ 📜BgmButton.js
┃ ┃ ┣ 📜GameEnding.js
┃ ┃ ┣ 📜Header.js
┃ ┃ ┣ 📜Loading.js
┃ ┃ ┣ 📜modal.css
┃ ┃ ┣ 📜Modal.js
┃ ┃ ┣ 📜MyButton.css
┃ ┃ ┣ 📜MyButton.js
┃ ┃ ┣ 📜sound.js
┃ ┃ ┗ 📜Timer.js
┃ ┣ 📂display
┃ ┃ ┗ 📜Modal.js
┃ ┣ 📂Game
┃ ┃ ┣ 📜GameFlow.jsx
┃ ┃ ┗ 📜GameManager.jsx
┃ ┣ 📂Openvidu
┃ ┃ ┣ 📜OvVideo.js
┃ ┃ ┣ 📜Prediction.js
┃ ┃ ┗ 📜UserVideoComponent.js
┃ ┣ 📂personal
┃ ┃ ┗ 📜MyInfo.js
┃ ┣ 📂room
┃ ┃ ┣ 📜Chance.js
┃ ┃ ┣ 📜ChanceCardList.js
┃ ┃ ┣ 📜ChanceModal.js
┃ ┃ ┣ 📜DiceModal.js
┃ ┃ ┣ 📜Gamemodal.css
┃ ┃ ┣ 📜Lobby.js
┃ ┃ ┣ 📜Map.js
┃ ┃ ┣ 📜modal.css
┃ ┃ ┣ 📜OurTeamVid.js
┃ ┃ ┣ 📜ResultComponent.js
┃ ┃ ┗ 📜TheirTeamVid.js
┃ ┗ 📂utils
┃ ┃ ┣ 📜DiceRoller.js
┃ ┃ ┣ 📜GameOver.js
┃ ┃ ┣ 📜GameStartAnimation.js
┃ ┃ ┣ 📜ParseJwt.js
┃ ┃ ┗ 📜Typing.js
┣ 📂fonts
┃ ┣ 📜dummy.js
┃ ┗ 📜DungGeunMo.ttf
┣ 📂pages
┃ ┣ 📜ExplanationPage.js
┃ ┣ 📜GamePage.js
┃ ┣ 📜LoginPage.js
┃ ┣ 📜MainPage.js
┃ ┣ 📜RedirectPage.js
┃ ┗ 📜SignUpPage.js
┣ 📂resources
┃ ┣ 📂images
┃ ┃ ┣ 📂Map
┃ ┃ ┃ ┣ 📜card-frame.png
┃ ┃ ┃ ┣ 📜chance1.gif
┃ ┃ ┃ ┣ 📜chance2.gif
┃ ┃ ┃ ┣ 📜chance3.gif
┃ ┃ ┃ ┣ 📜chance4.gif
┃ ┃ ┃ ┣ 📜chance5.gif
┃ ┃ ┃ ┣ 📜dice1.png
┃ ┃ ┃ ┣ 📜dice2.png
┃ ┃ ┃ ┣ 📜dice3.png
┃ ┃ ┃ ┣ 📜finish.gif
┃ ┃ ┃ ┣ 📜hell.gif
┃ ┃ ┃ ┣ 📜MapIMG.gif
┃ ┃ ┃ ┣ 📜MapIMG.jpg
┃ ┃ ┃ ┣ 📜marker1.png
┃ ┃ ┃ ┣ 📜marker2.png
┃ ┃ ┃ ┗ 📜start.gif
┃ ┃ ┣ 📜1.png
┃ ┃ ┣ 📜alienImg.png
┃ ┃ ┣ 📜astroImgOriginal.png
┃ ┃ ┣ 📜astronaut.png
┃ ┃ ┣ 📜astronaut2.png
┃ ┃ ┣ 📜back.PNG
┃ ┃ ┣ 📜back1.jpg
┃ ┃ ┣ 📜background.PNG
┃ ┃ ┣ 📜backgroundtest.png
┃ ┃ ┣ 📜bg.png
┃ ┃ ┣ 📜defeat.png
┃ ┃ ┣ 📜device.png
┃ ┃ ┣ 📜Explanation_IMG.png
┃ ┃ ┣ 📜gameBack.jpg
┃ ┃ ┣ 📜gameBack.png
┃ ┃ ┣ 📜gamebackground.jpg
┃ ┃ ┣ 📜gamebackground.PNG
┃ ┃ ┣ 📜gamebackgroundimg.png
┃ ┃ ┣ 📜history.png
┃ ┃ ┣ 📜insert_coin.png
┃ ┃ ┣ 📜kakao_login_L.png
┃ ┃ ┣ 📜kakao_login_M.png
┃ ┃ ┣ 📜lobby_background.png
┃ ┃ ┣ 📜lobby_background2.png
┃ ┃ ┣ 📜lobby_background3.png
┃ ┃ ┣ 📜lobby_background4.png
┃ ┃ ┣ 📜Logout.png
┃ ┃ ┣ 📜logout_icon.png
┃ ┃ ┣ 📜map frame.png
┃ ┃ ┣ 📜Mapbg.gif
┃ ┃ ┣ 📜mapframe.png
┃ ┃ ┣ 📜next.png
┃ ┃ ┣ 📜notperson.png
┃ ┃ ┣ 📜notperson1.png
┃ ┃ ┣ 📜OFF.png
┃ ┃ ┣ 📜ON.png
┃ ┃ ┣ 📜person.png
┃ ┃ ┣ 📜prev.png
┃ ┃ ┣ 📜profile_bg.png
┃ ┃ ┣ 📜soundoff_icon.png
┃ ┃ ┣ 📜soundon_icon.png
┃ ┃ ┣ 📜title.png
┃ ┃ ┣ 📜userimage.PNG
┃ ┃ ┣ 📜victory.png
┃ ┃ ┗ 📜victory2.png
┃ ┗ 📂sounds
┃ ┃ ┣ 📂ssafyromeda_soundpack
┃ ┃ ┃ ┣ 📜00_mainbgm.wav
┃ ┃ ┃ ┣ 📜01_siren.wav
┃ ┃ ┃ ┣ 📜02_typing.wav
┃ ┃ ┃ ┣ 📜03_lobbybgm.wav
┃ ┃ ┃ ┣ 📜04_gamebgm.wav
┃ ┃ ┃ ┣ 📜05_enterplayer.wav
┃ ┃ ┃ ┣ 📜06_button.wav
┃ ┃ ┃ ┣ 📜07_movefoward.wav
┃ ┃ ┃ ┣ 📜08_movebackward.wav
┃ ┃ ┃ ┣ 📜09_openminigame.wav
┃ ┃ ┃ ┣ 📜10_minigameclear.wav
┃ ┃ ┃ ┣ 📜11_minigamefail.wav
┃ ┃ ┃ ┣ 📜12_gamecwin.wav
┃ ┃ ┃ ┣ 📜13_gamelose.wav
┃ ┃ ┃ ┣ 📜14_dice.wav
┃ ┃ ┃ ┗ 📜99_sub.wav
┃ ┃ ┣ 📜buttonClick.wav
┃ ┃ ┣ 📜dummy.js
┃ ┃ ┣ 📜miniGameWin.wav
┃ ┃ ┣ 📜phoneWarning.wav
┃ ┃ ┣ 📜timerSound.wav
┃ ┃ ┗ 📜Xad - Birds (Vlog No Copyright Music).mp3
┣ 📂store
┃ ┣ 📜api.js
┃ ┣ 📜AuthSagas.js
┃ ┣ 📜AuthSlice.js
┃ ┣ 📜customAxios.js
┃ ┗ 📜index.js
┣ 📜App.css
┣ 📜App.js
┣ 📜App.test.js
┣ 📜AudioDocument.js
┣ 📜index.css
┣ 📜index.js
┣ 📜logo.svg
┣ 📜reportWebVitals.js
┗ 📜setupTests.js
```

