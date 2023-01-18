package com.ssafy.sfrmd.domain.user;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User> findByUserEamil(String userEmail);
    Optional<User> findByUserNickname(String userNickname);
    Optional<User> findByUserRefreshToken(String userRefreshToken);
}
