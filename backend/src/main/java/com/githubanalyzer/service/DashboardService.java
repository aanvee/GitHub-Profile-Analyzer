package com.githubanalyzer.service;

import com.githubanalyzer.model.AnalysisResponse;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardService {

    private final HistoryService historyService;

    public DashboardService(HistoryService historyService) {
        this.historyService = historyService;
    }

    public Map<String, Object> getOverviewStats() {
        List<AnalysisResponse> history = historyService.getHistory();
        Map<String, Object> stats = new HashMap<>();

        if (history.isEmpty()) {
            stats.put("currentScore", 0);
            stats.put("totalAnalyses", 0);
            stats.put("avgConfidence", 0);
            stats.put("trend", 0);
        } else {
            AnalysisResponse latest = history.get(0);
            stats.put("currentScore", Math.round(latest.getGitScore()));
            stats.put("totalAnalyses", history.size());
            stats.put("avgConfidence", Math.round(history.stream().mapToDouble(AnalysisResponse::getConfidence).average().orElse(0) * 100));
            
            // Calculate trend if we have at least 2 analyses
            if (history.size() >= 2) {
                double prevScore = history.get(1).getGitScore();
                stats.put("trend", Math.round(latest.getGitScore() - prevScore));
            } else {
                stats.put("trend", 0);
            }
        }

        return stats;
    }
}
