from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Optional
import numpy as np

app = FastAPI(title="GitScore ML Interface Service")

class FeatureVector(BaseModel):
    followers_count: int
    following_count: int
    public_repos: int
    total_stars: int
    total_forks: int
    account_age_days: int
    avg_stars_per_repo: float
    activity_score: float  # Mock input for recent commits/events

class Breakdown(BaseModel):
    repos: float
    followers: float
    activity: float
    impact: float

class PredictionResponse(BaseModel):
    gitScore: float
    confidence: float
    breakdown: Breakdown
    top_features: List[str]

@app.get("/")
async def root():
    return {"status": "online", "service": "GitScore Evaluation Engine"}

@app.post("/predict", response_model=PredictionResponse)
async def predict(features: FeatureVector):
    try:
        # 1. Calculate Score using a weighted heuristic (mimicking an ML model)
        # Normalizing features (simple version)
        repo_score = min(features.public_repos / 50.0, 1.0) * 20
        stars_score = min(features.total_stars / 200.0, 1.0) * 40
        follower_score = min(features.followers_count / 1000.0, 1.0) * 25
        age_bonus = min(features.account_age_days / 365.0, 1.0) * 15
        
        raw_score = repo_score + stars_score + follower_score + age_bonus
        git_score = round(raw_score, 1)

        # 2. Calculate Confidence
        # Higher data volume = higher confidence
        confidence = min((features.public_repos * 0.1) + (features.total_stars * 0.05), 0.98)
        confidence = round(max(confidence, 0.4), 2)

        # 3. Explainability: Feature Contribution Breakdown
        # We calculate how much each category contributed to the final score in %
        total_contrib = raw_score if raw_score > 0 else 1
        breakdown = Breakdown(
            repos=round((repo_score / total_contrib) * 100, 1),
            followers=round((follower_score / total_contrib) * 100, 1),
            activity=round(max(features.activity_score * 10, 10.0), 1), # Simulated activity
            impact=round((stars_score / total_contrib) * 100, 1)
        )

        # 4. Top Features (SHAP-like)
        contributions = {
            "Repositories": repo_score,
            "Stars/Impact": stars_score,
            "Followers": follower_score,
            "Account Age": age_bonus
        }
        sorted_features = sorted(contributions.items(), key=lambda x: x[1], reverse=True)
        top_features = [f"{name} (+{round(val, 1)})" for name, val in sorted_features if val > 0]

        return PredictionResponse(
            gitScore=git_score,
            confidence=confidence,
            breakdown=breakdown,
            top_features=top_features
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
