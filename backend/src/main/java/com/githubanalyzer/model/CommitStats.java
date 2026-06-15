package com.githubanalyzer.model;

import lombok.Data;

@Data
public class CommitStats {
    private int totalCommits;
    private double commitFrequency;
}
