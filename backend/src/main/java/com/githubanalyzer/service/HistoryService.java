package com.githubanalyzer.service;

import com.githubanalyzer.model.AnalysisResult;
import com.githubanalyzer.model.AnalysisResponse;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class HistoryService {

    private final AnalysisResultService analysisResultService;

    public HistoryService(AnalysisResultService analysisResultService) {
        this.analysisResultService = analysisResultService;
    }

    public void save(AnalysisResponse result) {
        // Convert AnalysisResponse to AnalysisResult entity
        AnalysisResult entity = new AnalysisResult();
        entity.setUsername(result.getUsername());
        entity.setGitScore(result.getGitScore());
        entity.setConfidence(result.getConfidence());
        entity.setTopFeatures(result.getTopFeatures());
        entity.setSuggestions(result.getSuggestions());
        analysisResultService.save(entity);
    }

    public List<AnalysisResponse> getHistory() {
        // Convert persisted entities back to response objects
        return analysisResultService.findAll().stream().map(ar -> {
            AnalysisResponse resp = new AnalysisResponse();
            resp.setUsername(ar.getUsername());
            resp.setGitScore(ar.getGitScore());
            resp.setConfidence(ar.getConfidence());
            resp.setTopFeatures(ar.getTopFeatures());
            resp.setSuggestions(ar.getSuggestions());
            return resp;
        }).toList();
    }

    public List<AnalysisResponse> getRecentAnalyses(int limit) {
        return analysisResultService.findAll().stream().limit(limit).map(ar -> {
            AnalysisResponse resp = new AnalysisResponse();
            resp.setUsername(ar.getUsername());
            resp.setGitScore(ar.getGitScore());
            resp.setConfidence(ar.getConfidence());
            resp.setTopFeatures(ar.getTopFeatures());
            resp.setSuggestions(ar.getSuggestions());
            return resp;
        }).toList();
    }
}
