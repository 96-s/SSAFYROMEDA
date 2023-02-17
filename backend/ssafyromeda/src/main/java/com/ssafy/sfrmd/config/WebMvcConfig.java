//package com.ssafy.sfrmd.config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
////@Configuration
//public class WebMvcConfig implements WebMvcConfigurer {
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**").allowedOrigins("http://localhost:3000", "http://localhost:3000/**").allowedHeaders("*")
//            .allowedOrigins("https://i8d205.p.ssafy.io", "https://i8d205.p.ssafy.io/**").allowedHeaders("*")
//            .allowedMethods(HttpMethod.GET.name(), HttpMethod.POST.name(), HttpMethod.PUT.name(),
//                HttpMethod.DELETE.name(), HttpMethod.HEAD.name(), HttpMethod.OPTIONS.name(),
//                HttpMethod.PATCH.name())
//            .maxAge(1800);
//    }
//}
