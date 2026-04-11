@Service
public class GithubApiClient {

    private final WebClient webClient;

    public GithubApiClient(WebClient webClient) {
        this.webClient = webClient;
    }

    public GithubProfile fetchProfile(String username) {
        return webClient.get()
                .uri("/users/{username}", username)
                .retrieve()
                .bodyToMono(GithubProfile.class)
                .block();
    }

    public List<GithubRepository> fetchRepositories(String username) {

        List<GithubRepository> allRepos = new ArrayList<>();
        int page = 1;

        while (true) {

            List<GithubRepository> repos = webClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/users/{username}/repos")
                            .queryParam("per_page", 100)
                            .queryParam("page", page)
                            .build(username))
                    .retrieve()
                    .bodyToFlux(GithubRepository.class)
                    .collectList()
                    .block();

            if (repos.isEmpty())
                break;

            allRepos.addAll(repos);
            page++;
        }

        return allRepos;
    }
}