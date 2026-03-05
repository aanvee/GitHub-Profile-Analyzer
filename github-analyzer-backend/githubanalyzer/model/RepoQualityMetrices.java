package com.githubanalyzer.model;

public class RepoQualityMetrics {

    private int totalRepos;

    private int reposWithReadme;
    private int reposWithTests;
    private int reposWithCiCd;
    private int reposWithDeployment;

    private double readmeRatio;
    private double testRatio;
    private double cicdRatio;
    private double deploymentRatio;

    private double avgReadmeLength;

    public RepoQualityMetrics() {}

    public int getTotalRepos() {
        return totalRepos;
    }

    public void setTotalRepos(int totalRepos) {
        this.totalRepos = totalRepos;
    }

    public int getReposWithReadme() {
        return reposWithReadme;
    }

    public void setReposWithReadme(int reposWithReadme) {
        this.reposWithReadme = reposWithReadme;
    }

    public int getReposWithTests() {
        return reposWithTests;
    }

    public void setReposWithTests(int reposWithTests) {
        this.reposWithTests = reposWithTests;
    }

    public int getReposWithCiCd() {
        return reposWithCiCd;
    }

    public void setReposWithCiCd(int reposWithCiCd) {
        this.reposWithCiCd = reposWithCiCd;
    }

    public int getReposWithDeployment() {
        return reposWithDeployment;
    }

    public void setReposWithDeployment(int reposWithDeployment) {
        this.reposWithDeployment = reposWithDeployment;
    }

    public double getReadmeRatio() {
        return readmeRatio;
    }

    public void setReadmeRatio(double readmeRatio) {
        this.readmeRatio = readmeRatio;
    }

    public double getTestRatio() {
        return testRatio;
    }

    public void setTestRatio(double testRatio) {
        this.testRatio = testRatio;
    }

    public double getCicdRatio() {
        return cicdRatio;
    }

    public void setCicdRatio(double cicdRatio) {
        this.cicdRatio = cicdRatio;
    }

    public double getDeploymentRatio() {
        return deploymentRatio;
    }

    public void setDeploymentRatio(double deploymentRatio) {
        this.deploymentRatio = deploymentRatio;
    }

    public double getAvgReadmeLength() {
        return avgReadmeLength;
    }

    public void setAvgReadmeLength(double avgReadmeLength) {
        this.avgReadmeLength = avgReadmeLength;
    }
}