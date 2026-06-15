package com.githubanalyzer.service;

import com.githubanalyzer.model.AnalysisResponse;
import com.githubanalyzer.model.FeatureVector;
import com.githubanalyzer.model.Suggestion;
import com.githubanalyzer.model.GithubProfile;
import com.githubanalyzer.model.GithubRepository;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class AnalysisService {

    private final GithubApiService githubApiService;
    private final FeatureExtractionService featureService;
    private final MLInterfaceService mlService;
    private final HistoryService historyService;

    public AnalysisService(GithubApiService githubApiService,
                           FeatureExtractionService featureService,
                           MLInterfaceService mlService,
                           HistoryService historyService) {
        this.githubApiService = githubApiService;
        this.featureService = featureService;
        this.mlService = mlService;
        this.historyService = historyService;
    }

    public AnalysisResponse fullAnalysis(String username) {
        // 1. Fetch data from GitHub
        GithubProfile profile = githubApiService.fetchProfile(username);
        List<GithubRepository> repos = githubApiService.fetchRepositories(username);

        // 2. Extract features
        FeatureVector features = featureService.extractFeatures(profile, repos);

        // 3. Get prediction from ML service
        MLInterfaceService.MLPrediction prediction = mlService.predict(features);

        // 4. Generate AI suggestions based on results
        List<Suggestion> suggestions = generateSuggestions(prediction);

        AnalysisResponse response = new AnalysisResponse(
                username,
                prediction.getGitScore(),
                prediction.getConfidence(),
                prediction.getBreakdown(),
                suggestions,
                prediction.getTop_features()
        );

        // 5. Save to history
        historyService.save(response);

        return response;
    }

    private List<Suggestion> generateSuggestions(MLInterfaceService.MLPrediction pred) {
        List<Suggestion> list = new ArrayList<>();
        double score = pred.getGitScore();

        if (pred.getBreakdown().getImpact() < 30) {
            list.add(new Suggestion("Your repositories have low star counts. Consider sharing your work on social platforms or improving documentation.", "visibility", "high"));
        }
        
        if (pred.getBreakdown().getRepos() < 20) {
            list.add(new Suggestion("A smaller number of public repositories can impact your score. Try organizing your projects into dedicated repos.", "growth", "medium"));
        }

        if (pred.getBreakdown().getFollowers() < 20) {
            list.add(new Suggestion("Network growth: Engaging with common developer communities can help increase your visibility and follower count.", "visibility", "medium"));
        }

        if (score > 80) {
            list.add(new Suggestion("Exceptional profile! Focus on maintaining high-quality READMEs to further solidfy your impact.", "quality", "low"));
        } else if (score < 40) {
            list.add(new Suggestion("Initial Growth: Focus on consistent contributions to trending repositories to boost your activity ranking.", "growth", "high"));
        }

        return list;
    }
}
