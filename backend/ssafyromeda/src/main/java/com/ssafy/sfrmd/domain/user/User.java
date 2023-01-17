package com.ssafy.sfrmd.domain.user;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
public class User {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long userNo;
        private String userNickname;
        private String userEmail;
        private String userAccessToken;

        @Builder
        public User(String userNickname, String userEmail, String userAccessToken) {
                this.userNickname = userNickname;
                this.userEmail = userEmail;
                this.userAccessToken = userAccessToken;
        }
}
