@RestController
@RequestMapping("/api")
public class GithubAnalyzerController {

    private final GithubApiClient apiClient;
    private final FeatureExtractionService featureService;

    public GithubAnalyzerController(
            GithubApiClient apiClient,
            FeatureExtractionService featureService) {

        this.apiClient = apiClient;
        this.featureService = featureService;
    }

    @GetMapping("/analyze/{username}")
    public FeatureVector analyze(@PathVariable String username) {

        GithubProfile profile = apiClient.fetchProfile(username);
        List<GithubRepository> repos =
                apiClient.fetchRepositories(username);

        return featureService.extractFeatures(profile, repos);
    }
}