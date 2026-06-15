package com.githubanalyzer.repository;

import com.githubanalyzer.model.AnalysisResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnalysisResultRepository extends JpaRepository<AnalysisResult, Long> {
    // Additional query methods can be defined here if needed
}
