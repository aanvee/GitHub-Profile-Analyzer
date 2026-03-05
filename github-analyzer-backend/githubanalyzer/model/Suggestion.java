package com.githubanalyzer.model;

public class Suggestion {

    private String message;
    private String category;
    private String priority;

    public Suggestion(String message, String category, String priority) {
        this.message = message;
        this.category = category;
        this.priority = priority;
    }

    public String getMessage() {
        return message;
    }

    public String getCategory() {
        return category;
    }

    public String getPriority() {
        return priority;
    }
}