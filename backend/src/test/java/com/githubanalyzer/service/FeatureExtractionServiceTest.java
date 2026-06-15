package com.githubanalyzer.service;

import com.githubanalyzer.model.FeatureVector;
import com.githubanalyzer.model.GithubProfile;
import com.githubanalyzer.model.GithubRepository;
import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class FeatureExtractionServiceTest {

    @Test
    public void testExtractFeatures() {
        GithubProfile profile = new GithubProfile();
        profile.setLogin("testuser");
        profile.setName("Test User");
        profile.setBio("test bio");
        profile.setCreated_at(Instant.parse("2020-01-01T00:00:00Z").toString());
        profile.setFollowers(100);
        profile.setFollowing(50);
        profile.setPublic_repos(2);

        GithubRepository repo1 = new GithubRepository();
        repo1.setName("repo1");
        repo1.setStargazers_count(10);
        repo1.setForks_count(5);
        repo1.setDescription("A description");
        repo1.setHas_readme(true);
        repo1.setHomepage("https://example.com");

        GithubRepository repo2 = new GithubRepository();
        repo2.setName("repo2");
        repo2.setStargazers_count(0);
        repo2.setForks_count(0);
        repo2.setDescription(null);
        repo2.setHas_readme(false);
        repo2.setHomepage(null);

        List<GithubRepository> repos = new ArrayList<>();
        repos.add(repo1);
        repos.add(repo2);

        FeatureExtractionService service = new FeatureExtractionService();
        FeatureVector fv = service.extractFeatures(profile, repos);

        assertEquals(100, fv.getFollowers());
        assertEquals(50, fv.getFollowing());
        assertEquals(2, fv.getRepoCount());
        assertEquals(profile.getBio().length(), fv.getBioLength());
        assertTrue(fv.getAccountAgeDays() > 0);
        assertEquals(10, fv.getTotalStars());
        assertEquals(5, fv.getTotalForks());
        assertEquals(5.0, fv.getAvgStars(), 0.001);
        assertEquals(0.5, fv.getRepoWithDescriptionPercent(), 0.001);
        assertEquals(0.5, fv.getCommitFrequency(), 0.001);
        assertEquals(0.8f, fv.getActivity_score(), 0.001f);
    }
}
