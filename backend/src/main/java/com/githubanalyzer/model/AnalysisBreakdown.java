package com.githubanalyzer.model;

public class AnalysisBreakdown {
    private double repos;
    private double followers;
    private double activity;
    private double impact;

    public AnalysisBreakdown() {}

    public AnalysisBreakdown(double repos, double followers, double activity, double impact) {
        this.repos = repos;
        this.followers = followers;
        this.activity = activity;
        this.impact = impact;
    }

    public double getRepos() { return repos; }
    public void setRepos(double repos) { this.repos = repos; }

    public double getFollowers() { return followers; }
    public void setFollowers(double followers) { this.followers = followers; }

    public double getActivity() { return activity; }
    public void setActivity(double activity) { this.activity = activity; }

    public double getImpact() { return impact; }
    public void setImpact(double impact) { this.impact = impact; }
}
