package com.ssafy.sfrmd.config;

import io.openvidu.java.client.Connection;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.ConnectionType;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduRole;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
public class AppConfig {

    @Bean
    public OpenVidu openVidu(@Value("${openvidu.secret}") String secret,
        @Value("${openvidu.url}") String openViduUrl) {
        return new OpenVidu(openViduUrl, secret);
    }
    SessionProperties properties = new SessionProperties.Builder().build();
    Session session = openVidu().createSession(properties);
    ConnectionProperties connectionProperties = new ConnectionProperties.Builder()
        .type(ConnectionType.WEBRTC)
        .role(OpenViduRole.PUBLISHER)
        .data("user_data")
        .build();

    Connection connection = session.createConnection(connectionProperties);
    String token = connection.getToken(); // Send this string to the client side
}
