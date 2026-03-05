package com.githubanalyzer.service;

import com.githubanalyzer.model.FeatureVector;
import com.githubanalyzer.model.RepoQualityMetrics;
import com.githubanalyzer.model.Suggestion;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SuggestionService {

    public List<Suggestion> generateSuggestions(
            FeatureVector features,
            RepoQualityMetrics qualityMetrics) {

        List<Suggestion> suggestions = new ArrayList<>();

        evaluateReadmeCoverage(qualityMetrics, suggestions);

        evaluateTestingPractices(qualityMetrics, suggestions);

        evaluateCiCdAdoption(qualityMetrics, suggestions);

        evaluateProjectPopularity(features, suggestions);

        evaluateActivity(features, suggestions);

        evaluateDocumentationQuality(qualityMetrics, suggestions);

        return suggestions;
    }

    private void evaluateReadmeCoverage(
            RepoQualityMetrics metrics,
            List<Suggestion> suggestions) {

        if(metrics.getReadmeRatio() < 0.5) {

            suggestions.add(new Suggestion(
                    "Add README files to more repositories to improve documentation",
                    "Documentation",
                    "High"
            ));
        }
    }

    private void evaluateTestingPractices(
            RepoQualityMetrics metrics,
            List<Suggestion> suggestions) {

        if(metrics.getTestRatio() < 0.3) {

            suggestions.add(new Suggestion(
                    "Include automated tests in your repositories",
                    "Testing",
                    "Medium"
            ));
        }
    }

    private void evaluateCiCdAdoption(
            RepoQualityMetrics metrics,
            List<Suggestion> suggestions) {

        if(metrics.getCicdRatio() < 0.2) {

            suggestions.add(new Suggestion(
                    "Adopt CI/CD pipelines using GitHub Actions",
                    "DevOps",
                    "Medium"
            ));
        }
    }

    private void evaluateProjectPopularity(
            FeatureVector features,
            List<Suggestion> suggestions) {

        if(features.getAvgStars() < 1) {

            suggestions.add(new Suggestion(
                    "Promote your repositories and improve project visibility",
                    "Community",
                    "Low"
            ));
        }
    }

    private void evaluateActivity(
            FeatureVector features,
            List<Suggestion> suggestions) {

        if(features.getCommitFrequency() < 2) {

            suggestions.add(new Suggestion(
                    "Maintain consistent commit activity",
                    "Activity",
                    "High"
            ));
        }
    }

    private void evaluateDocumentationQuality(
            RepoQualityMetrics metrics,
            List<Suggestion> suggestions) {

        if(metrics.getAvgReadmeLength() < 100) {

            suggestions.add(new Suggestion(
                    "Improve README documentation with setup instructions and examples",
                    "Documentation",
                    "Medium"
            ));
        }
    }
}