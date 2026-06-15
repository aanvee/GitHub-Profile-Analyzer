package com.githubanalyzer.client;

import com.githubanalyzer.model.GithubProfile;
import com.githubanalyzer.model.GithubRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;

@Service
public class GithubApiClient {

    private final WebClient webClient;

    public GithubApiClient(WebClient webClient) {
        this.webClient = webClient;
    }

    public GithubProfile fetchProfile(String username) {
        return webClient.get()
                .uri("/users/{username}", username)
                .retrieve()
                .onStatus(status -> status.value() == 404,
                    clientResponse -> clientResponse.bodyToMono(String.class)
                        .defaultIfEmpty("User not found")
                        .flatMap(msg -> reactor.core.publisher.Mono.error(new com.githubanalyzer.exception.UsernameNotFoundException(msg))))
                .bodyToMono(GithubProfile.class)
                .block();
    }

    public List<GithubRepository> fetchRepositories(String username) {

        List<GithubRepository> allRepos = new ArrayList<>();
        int page = 1;

        while (true) {
            final int currentPage = page;

            List<GithubRepository> repos = webClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/users/{username}/repos")
                            .queryParam("per_page", 100)
                            .queryParam("page", currentPage)
                            .build(username))
                    .retrieve()
                    .onStatus(status -> status.value() == 404,
                        clientResponse -> clientResponse.bodyToMono(String.class)
                            .defaultIfEmpty("User not found")
                            .flatMap(msg -> reactor.core.publisher.Mono.error(new com.githubanalyzer.exception.UsernameNotFoundException(msg))))
                    .bodyToFlux(GithubRepository.class)
                    .collectList()
                    .block();

            if (repos == null || repos.isEmpty())
                break;

            allRepos.addAll(repos);
            page++;
        }

        return allRepos;
    }
}