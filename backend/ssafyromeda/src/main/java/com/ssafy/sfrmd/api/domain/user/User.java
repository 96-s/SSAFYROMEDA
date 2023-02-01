package com.ssafy.sfrmd.api.domain.user;

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

        @Enumerated(EnumType.STRING)
        private Role userRole;

        @Builder
        public User(String userNickname, String userEmail, String userRefreshToken, Role userRole) {
                this.userNickname = userNickname;
                this.userEmail = userEmail;
                this.userRefreshToken = userRefreshToken;
                this.userRole = userRole;
        }

        public void updateUserNickname(String updateNickname){
                this.userNickname = updateNickname;
        }
        public void updateUserRole() {
                this.userRole = Role.USER;
        }
        public void updateUserRefreshToken(String updateRefreshToken) {
                this.userRefreshToken = updateRefreshToken;
        }
}
