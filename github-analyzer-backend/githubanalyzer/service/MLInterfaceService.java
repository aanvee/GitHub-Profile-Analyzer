@Service
public class MlInferenceService {

    private final WebClient webClient;

    public MlInferenceService(WebClient webClient) {
        this.webClient = webClient;
    }

    public double predictScore(FeatureVector features) {

        return webClient.post()
                .uri("http://ml-service:8000/predict")
                .bodyValue(features)
                .retrieve()
                .bodyToMono(MLResponse.class)
                .block();
                .getProfile_score()
    }
}