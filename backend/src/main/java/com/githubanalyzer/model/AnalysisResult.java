package com.githubanalyzer.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "analysis_result")
public class AnalysisResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private double gitScore;
    private double confidence;

    @Lob
    @Convert(converter = com.githubanalyzer.util.StringListConverter.class)
    private List<String> topFeatures;

    @Lob
    @Convert(converter = com.githubanalyzer.util.SuggestionListConverter.class)
    private List<Suggestion> suggestions;

    // Additional JSON fields can be added similarly using converters
}
