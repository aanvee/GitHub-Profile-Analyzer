package com.githubanalyzer.util;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import com.githubanalyzer.model.Suggestion;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;

@Converter(autoApply = false)
public class SuggestionListConverter implements AttributeConverter<List<Suggestion>, String> {
    private static final ObjectMapper mapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(List<Suggestion> attribute) {
        if (attribute == null) return null;
        try {
            return mapper.writeValueAsString(attribute);
        } catch (Exception e) {
            throw new IllegalArgumentException("Could not convert suggestion list to JSON", e);
        }
    }

    @Override
    public List<Suggestion> convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isEmpty()) return null;
        try {
            return mapper.readValue(dbData, new TypeReference<List<Suggestion>>() {});
        } catch (Exception e) {
            throw new IllegalArgumentException("Could not convert JSON to suggestion list", e);
        }
    }
}
