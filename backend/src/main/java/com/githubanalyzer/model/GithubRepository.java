package com.githubanalyzer.model;

import lombok.Data;

@Data
public class GithubRepository {
    private String name;
    private int stargazers_count;
    private int forks_count;
    private String description;
    private boolean has_readme;
    private String homepage;
}