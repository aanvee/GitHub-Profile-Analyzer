package com.githubanalyzer;

import org.springframework.retry.annotation.EnableRetry;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@EnableRetry
@SpringBootApplication
public class Github_Analyzer_Application {

    public static void main(String[] args) {
        SpringApplication.run(Github_Analyzer_Application.class, args);
    }
}
