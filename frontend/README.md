# 🖼 Frontend



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
- docker


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

