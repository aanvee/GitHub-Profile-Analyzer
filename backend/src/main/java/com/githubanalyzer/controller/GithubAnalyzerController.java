package com.githubanalyzer.controller;

import com.githubanalyzer.model.AnalysisResponse;
import com.githubanalyzer.service.AnalysisService;
import com.githubanalyzer.service.HistoryService;
import com.githubanalyzer.service.DashboardService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"}) // Allow frontend access
public class GithubAnalyzerController {

    private final AnalysisService analysisService;
    private final HistoryService historyService;
    private final DashboardService dashboardService;

    public GithubAnalyzerController(AnalysisService analysisService, 
                                    HistoryService historyService,
                                    DashboardService dashboardService) {
        this.analysisService = analysisService;
        this.historyService = historyService;
        this.dashboardService = dashboardService;
    }

    @GetMapping("/analyze/{username}")
    public AnalysisResponse analyze(@PathVariable String username) {
        return analysisService.fullAnalysis(username);
    }

    @GetMapping("/history")
    public List<AnalysisResponse> getHistory() {
        return historyService.getHistory();
    }

    @GetMapping("/dashboard/stats")
    public Map<String, Object> getDashboardStats() {
        return dashboardService.getOverviewStats();
    }
}