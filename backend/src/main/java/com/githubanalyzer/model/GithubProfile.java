package com.githubanalyzer.model;

import lombok.Data;

/**
 * Model representing a GitHub user profile.
 */
@Data
public class GithubProfile {
    private String login;
    private String name;
    private String bio;
    private String created_at;
    private int followers;
    private int following;
    private int public_repos;

    // Explicit getters for fields used in services (in case Lombok processing fails)
    public String getBio() { return this.bio; }
    public String getCreated_at() { return this.created_at; }
}
