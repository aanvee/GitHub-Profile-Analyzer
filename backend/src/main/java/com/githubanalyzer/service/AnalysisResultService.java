package com.githubanalyzer.service;

import com.githubanalyzer.model.AnalysisResult;
import com.githubanalyzer.repository.AnalysisResultRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AnalysisResultService {
    private final AnalysisResultRepository repository;

    public AnalysisResultService(AnalysisResultRepository repository) {
        this.repository = repository;
    }

    public AnalysisResult save(AnalysisResult result) {
        return repository.save(result);
    }

    public List<AnalysisResult> findAll() {
        return repository.findAll();
    }
}
