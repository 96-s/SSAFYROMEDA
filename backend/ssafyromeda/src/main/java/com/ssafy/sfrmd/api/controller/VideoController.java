package com.ssafy.sfrmd.api.controller;

import com.ssafy.sfrmd.api.service.VideoService;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;
import java.util.Map;
import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class VideoController {
    private final VideoService videoService;

//    @PostConstruct
//    public void init() {
//        videoService.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
//    }
//
//    /**
//     * @param params The Session properties
//     * @return The Session ID
//     */
//    @PostMapping("/api/sessions")
//    public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params)
//        throws OpenViduJavaClientException, OpenViduHttpException {
//        SessionProperties properties = SessionProperties.fromJson(params).build();
//        Session session = openvidu.createSession(properties);
//        return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
//    }
}
