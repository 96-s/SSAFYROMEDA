package com.ssafy.sfrmd.jwt;

import com.ssafy.sfrmd.domain.user.User;
import com.ssafy.sfrmd.domain.user.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Base64;
import java.util.Date;
import javax.annotation.PostConstruct;
import javax.xml.bind.DatatypeConverter;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Getter
@Service
public class JwtProvider {
    @Value("${jwt.secretKey}")
    private String secretKey;
    @Value("${jwt.access.expiration}")
    private static Long accessTokenValidTime;
    @Value("${jwt.refresh.expiration}")
    private static Long refreshTokenValidTime;

    private final UserRepository userRepository;
    private final UserDetailsService userDetailsService;

    @PostConstruct
    private void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }
    //토큰에서 Claim 추출
    private Claims getClaimsFormToken(String token) {
        return Jwts.parser().setSigningKey(DatatypeConverter.parseBase64Binary(secretKey)).parseClaimsJws(token).getBody();
    }

    //토큰에서 인증 subject 추출
    private String getSubject(String token) {
        return getClaimsFormToken(token).getSubject();
    }

    //토큰에서 인증 정보 추출
    public Authentication getAuthentication(String token) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(this.getSubject(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    //토큰에서 인증 정보 추출
    public String generateJwtToken(Authentication authentication) {

        Claims claims = Jwts.claims().setSubject(String.valueOf(((UserDetailsImpl) authentication.getPrincipal()).getUsername()));

        User user = userRepository.findByUserEmail(claims.getSubject());
        claims.put("email", user.getUserEmail());
        claims.put("nickname", user.getUserNickname());
        claims.put("roles", authentication.getAuthorities());
        Date now = new Date();
        return Jwts.builder()
            .setClaims(claims)
            .setIssuedAt(now)
            .setExpiration(new Date(now.getTime() + accessTokenValidTime))
            .signWith(SignatureAlgorithm.HS256, secretKey)
            .compact();
    }

    //유저 정보로 토큰 생성
    public String generateJwtTokenFromUser(User user) {
        Claims claims = Jwts.claims().setSubject(user.getUserEmail());

        claims.put("no", user.getUserNo());
        claims.put("nickname", user.getUserNickname());
        claims.put("roles", user.getUserRole());
        Date now = new Date();
        return Jwts.builder()
            .setClaims(claims)
            .setIssuedAt(now)
            .setExpiration(new Date(now.getTime() + accessTokenValidTime))
            .signWith(SignatureAlgorithm.HS256, secretKey)
            .compact();
    }

    //토큰 검증
    public boolean isValidToken(String token) {
        try {
            Claims claims = getClaimsFormToken(token);
            return !claims.getExpiration().before(new Date());
        } catch (JwtException | NullPointerException exception) {
            return false;
        }
    }

    public User getUser(String token) {
        Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
        String userEmail = String.valueOf(claims.getBody().get("email"));
        return userRepository.findByUserEmail(userEmail);
    }

}
