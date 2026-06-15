package com.githubanalyzer.model;

import java.util.List;

public class AnalysisResponse {
    private String username;
    private double gitScore;
    private double confidence;
    private AnalysisBreakdown breakdown;
    private List<Suggestion> suggestions;
    private List<String> topFeatures;

    public AnalysisResponse() {}

    public AnalysisResponse(String username, double gitScore, double confidence, 
                            AnalysisBreakdown breakdown, List<Suggestion> suggestions,
                            List<String> topFeatures) {
        this.username = username;
        this.gitScore = gitScore;
        this.confidence = confidence;
        this.breakdown = breakdown;
        this.suggestions = suggestions;
        this.topFeatures = topFeatures;
    }

    // Getters and Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public double getGitScore() { return gitScore; }
    public void setGitScore(double gitScore) { this.gitScore = gitScore; }

    public double getConfidence() { return confidence; }
    public void setConfidence(double confidence) { this.confidence = confidence; }

    public AnalysisBreakdown getBreakdown() { return breakdown; }
    public void setBreakdown(AnalysisBreakdown breakdown) { this.breakdown = breakdown; }

    public List<Suggestion> getSuggestions() { return suggestions; }
    public void setSuggestions(List<Suggestion> suggestions) { this.suggestions = suggestions; }

    public List<String> getTopFeatures() { return topFeatures; }
    public void setTopFeatures(List<String> topFeatures) { this.topFeatures = topFeatures; }
}
