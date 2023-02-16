# :back: Backend



## 🔧 개발 환경
- Google Chrome Browser
- IntelliJ (2022.3.1)
- Java 11
- Spring Boot v2.7.7
- Spring Security
- Spring Data JPA
- mySQL v5.7.39
- Openvidu v2.25.0
- SockJS, Stomp
- Docker

## :pray: Code Style
- google code style
  - 특징
	- indentation : 4 spaces
	- colmun limit : 100
  - IDE 적용 방법
    - [eclipse 적용](https://github.com/google/styleguide/blob/gh-pages/eclipse-java-google-style.xml)
    - [intellij 적용](https://github.com/google/styleguide/blob/gh-pages/intellij-java-google-style.xml)


## :bulb: 주요 기능​
### 소셜 로그인
- 카카오 소셜 로그인 API 사용
- user 정보를 암호화하여 jwt 토큰에 담아 클라이언트에게 전달

### 화상 미팅
- openvidu를 이용한 화상 미팅 구현
- openvidu를 통해 session 생성
- 자체적으로 생성한 roomCode를 sessionID로 활용

### 방 정보 저장
- roomCode와 roomHost 그리고 현재방에 접속한 인원을 관리
- 방 정보를 빠르게 조회 가능

### 게인 전적 정보 저장
- 회원 등록시 초기값으로 저장
- 게임 결과에 따라 수정
- 전적 정보 조회 가능

### 환경 구축
- DB
local에서는 mysql 또는 mariadb를 사용하면 되고, schema는 `ssafyromeda` 이름으로 생성

- openvidu docker container를 실행

## 📈 프로젝트 구조
```
📦sfrmd
 ┣ 📂api
 ┃ ┣ 📂controller
 ┃ ┃ ┣ 📂history
 ┃ ┃ ┣ 📂room
 ┃ ┃ ┗ 📂user
 ┃ ┣ 📂domain
 ┃ ┃ ┣ 📂history
 ┃ ┃ ┣ 📂room
 ┃ ┃ ┗ 📂user
 ┃ ┃ ┃ ┣ 📂auth
 ┃ ┣ 📂dto
 ┃ ┃ ┣ 📂history
 ┃ ┃ ┣ 📂room
 ┃ ┃ ┗ 📂user
 ┃ ┗ 📂service
 ┃ ┃ ┣ 📂history
 ┃ ┃ ┣ 📂room
 ┃ ┃ ┣ 📂user
 ┣ 📂config
 ┣ 📂execption
 ┣ 📂handler
 ┣ 📂jwt
 ┣ 📂security
 ┃ ┗ 📂oauth
 ┗ 📜SsafyromedaApplication.java
```
