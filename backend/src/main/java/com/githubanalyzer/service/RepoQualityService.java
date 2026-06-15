package com.githubanalyzer.service;

import com.githubanalyzer.model.GithubRepository;
import com.githubanalyzer.model.RepoQualityMetrics;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RepoQualityService {

    public RepoQualityMetrics analyzeRepositories(List<GithubRepository> repos) {

        RepoQualityMetrics metrics = new RepoQualityMetrics();

        int readmeCount = 0;
        int testCount = 0;
        int cicdCount = 0;
        int deploymentCount = 0;

        int totalReadmeLength = 0;

        for(GithubRepository repo : repos) {

            if(hasReadme(repo)) {
                readmeCount++;

                int length = estimateReadmeLength(repo);
                totalReadmeLength += length;
            }

            if(hasTests(repo))
                testCount++;

            if(hasCiCd(repo))
                cicdCount++;

            if(hasDeployment(repo))
                deploymentCount++;
        }

        int total = repos.size();

        metrics.setTotalRepos(total);
        metrics.setReposWithReadme(readmeCount);
        metrics.setReposWithTests(testCount);
        metrics.setReposWithCiCd(cicdCount);
        metrics.setReposWithDeployment(deploymentCount);

        if(total > 0) {

            metrics.setReadmeRatio((double) readmeCount / total);
            metrics.setTestRatio((double) testCount / total);
            metrics.setCicdRatio((double) cicdCount / total);
            metrics.setDeploymentRatio((double) deploymentCount / total);

            metrics.setAvgReadmeLength(
                    readmeCount == 0 ? 0 : (double) totalReadmeLength / readmeCount
            );
        }

        return metrics;
    }

    private boolean hasReadme(GithubRepository repo) {

        if(repo.getName() == null)
            return false;

        return repo.getName().toLowerCase().contains("readme")
                || repo.getDescription() != null;
    }

    private boolean hasTests(GithubRepository repo) {

        if(repo.getName() == null)
            return false;

        String name = repo.getName().toLowerCase();

        return name.contains("test")
                || name.contains("spec")
                || name.contains("unit");
    }

    private boolean hasCiCd(GithubRepository repo) {

        if(repo.getDescription() == null)
            return false;

        String desc = repo.getDescription().toLowerCase();

        return desc.contains("github actions")
                || desc.contains("ci")
                || desc.contains("pipeline");
    }

    private boolean hasDeployment(GithubRepository repo) {

        return repo.getHomepage() != null
                && !repo.getHomepage().isEmpty();
    }

    private int estimateReadmeLength(GithubRepository repo) {

        if(repo.getDescription() == null)
            return 0;

        return repo.getDescription().length();
    }
}