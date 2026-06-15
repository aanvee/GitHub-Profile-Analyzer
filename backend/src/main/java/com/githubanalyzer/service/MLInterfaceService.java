package com.githubanalyzer.service;

import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Recover;
import org.springframework.retry.annotation.Retryable;

import com.githubanalyzer.model.FeatureVector;
import com.githubanalyzer.model.AnalysisBreakdown;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.List;

@Service
public class MLInterfaceService {

    private final WebClient webClient;

    public MLInterfaceService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("http://localhost:8000").build();
    }

    @Retryable(value = Exception.class, maxAttempts = 3, backoff = @Backoff(delay = 2000))
    public MLPrediction predict(FeatureVector features) {
        return webClient.post()
                .uri("/predict")
                .bodyValue(features)
                .retrieve()
                .bodyToMono(MLPrediction.class)
                .block();
    }

    @Recover
    public MLPrediction recover(Exception e, FeatureVector features) {
        // Fallback prediction when ML service is unavailable
        MLPrediction fallback = new MLPrediction();
        fallback.setGitScore(50.0); // neutral score
        fallback.setConfidence(0.0);
        fallback.setBreakdown(new AnalysisBreakdown()); // empty breakdown
        fallback.setTop_features(java.util.Collections.emptyList());
        return fallback;
    }

    public static class MLPrediction {
        private double gitScore;
        private double confidence;
        private AnalysisBreakdown breakdown;
        private List<String> top_features;

        public double getGitScore() { return gitScore; }
        public void setGitScore(double gitScore) { this.gitScore = gitScore; }

        public double getConfidence() { return confidence; }
        public void setConfidence(double confidence) { this.confidence = confidence; }

        public AnalysisBreakdown getBreakdown() { return breakdown; }
        public void setBreakdown(AnalysisBreakdown breakdown) { this.breakdown = breakdown; }

        public List<String> getTop_features() { return top_features; }
        public void setTop_features(List<String> top_features) { this.top_features = top_features; }
    }
}