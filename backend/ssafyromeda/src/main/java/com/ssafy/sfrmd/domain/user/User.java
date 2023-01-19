package com.ssafy.sfrmd.domain.user;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import com.ssafy.sfrmd.domain.user.Role;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="user")
public class User {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name="user_no")
        private Long userNo;
        @Column(name="user_nickname")
        private String userNickname;
        @Column(name="user_email")
        private String userEmail;
        @Column(name="user_refresh_token")
        private String userRefreshToken;

//        @Enumerated(EnumType.STRING)
//        private Role role;

        @Builder
        public User(String userNickname, String userEmail, String userRefreshToken) {
                this.userNickname = userNickname;
                this.userEmail = userEmail;
                this.userRefreshToken = userRefreshToken;
        }

//        public void authorizeUser() {
//                this.role = Role.USER;
//        }

        public void updateUserRefreshToken(String updateRefreshToken) {
                this.userRefreshToken = updateRefreshToken;
        }
}
