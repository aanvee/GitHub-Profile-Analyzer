package com.githubanalyzer.service;

import com.githubanalyzer.model.GithubProfile;
import com.githubanalyzer.model.GithubRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
public class GithubApiService {

    private final WebClient webClient;
    private final String githubToken;

    public GithubApiService(WebClient webClient, @Value("${github.token}") String githubToken) {
        this.webClient = webClient;
        this.githubToken = githubToken;
    }

    public GithubProfile fetchProfile(String username) {
        return webClient.get()
                .uri("/users/{username}", username)
                .header("Authorization", githubToken != null && !githubToken.isEmpty() ? "Bearer " + githubToken : null)
                .retrieve()
                .bodyToMono(GithubProfile.class)
                .block();
    }

    public List<GithubRepository> fetchRepositories(String username) {
        return webClient.get()
                .uri("/users/{username}/repos?per_page=100", username)
                .header("Authorization", githubToken != null && !githubToken.isEmpty() ? "Bearer " + githubToken : null)
                .retrieve()
                .bodyToFlux(GithubRepository.class)
                .collectList()
                .block();
    }
}
