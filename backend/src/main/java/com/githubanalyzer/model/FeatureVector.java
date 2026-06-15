package com.githubanalyzer.model;

import lombok.Data;

/**
 * Feature vector representing aggregated metrics for a GitHub profile analysis.
 * Lombok @Data provides getters, setters, equals, hashCode, and toString.
 */
@Data
public class FeatureVector {
    private int followers;
    private int following;
    private int repoCount;
    private int bioLength;
    private int accountAgeDays;
    private double avgStars;
    private int totalStars;
    private int totalForks;
    private double repoWithReadmePercent;
    private double repoWithDescriptionPercent;
    private float activity_score;
    private double commitFrequency;
}