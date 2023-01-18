package com.ssafy.sfrmd.api.service;

import io.openvidu.java.client.Connection;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.ConnectionType;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.OpenViduRole;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class VideoService {
    private final OpenVidu openVidu;

    public Session getVideoSession() {
        SessionProperties properties = new SessionProperties.Builder().build();

        try {
            return openVidu.createSession(properties);
        } catch (OpenViduJavaClientException ex) {
            throw new RuntimeException(ex);
        } catch (OpenViduHttpException ex) {
            throw new RuntimeException(ex);
        }
    }

    public Connection getVideoConnection() {
        ConnectionProperties connectionProperties = new ConnectionProperties.Builder()
            .type(ConnectionType.WEBRTC).role(OpenViduRole.PUBLISHER)
            .data("user_data").build();

        try {
            return getVideoSession().createConnection(connectionProperties);
        } catch(OpenViduJavaClientException e) {
            throw new RuntimeException(e);
        } catch(OpenViduHttpException e) {
            throw new RuntimeException(e);
        }
    }

    public String getVideoToken() {
        return getVideoConnection().getToken();
    }
}
