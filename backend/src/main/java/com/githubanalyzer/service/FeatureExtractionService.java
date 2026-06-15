package com.githubanalyzer.service;

import com.githubanalyzer.model.FeatureVector;
import com.githubanalyzer.model.GithubProfile;
import com.githubanalyzer.model.GithubRepository;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.List;

@Service
public class FeatureExtractionService {

    public FeatureVector extractFeatures(GithubProfile profile,
            List<GithubRepository> repos) {

        FeatureVector fv = new FeatureVector();

        fv.setFollowers(profile.getFollowers());
        fv.setFollowing(profile.getFollowing());
        fv.setRepoCount(repos.size());

        fv.setBioLength(profile.getBio() == null ? 0 : profile.getBio().length());

        fv.setAccountAgeDays((int) Duration.between(
                Instant.parse(profile.getCreated_at()),
                Instant.now()).toDays());

        int totalStars = 0;
        int totalForks = 0;
        int descriptionCount = 0;

        for (GithubRepository repo : repos) {

            totalStars += repo.getStargazers_count();
            totalForks += repo.getForks_count();

            if (repo.getDescription() != null)
                descriptionCount++;
        }

        fv.setTotalStars(totalStars);
        fv.setTotalForks(totalForks);

        if (repos.size() > 0) {
            fv.setAvgStars((double) totalStars / repos.size());
            fv.setRepoWithDescriptionPercent((double) descriptionCount / repos.size());
        }

        // Dummy value for commitFrequency and activity_score if needed
        fv.setCommitFrequency(0.5);
        fv.setActivity_score(0.8f);

        return fv;
    }
}