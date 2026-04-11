package githubanalyzer.service;

@Service
public class FeatureExtractionService {

    public FeatureVector extractFeatures(GithubProfile profile,
            List<GithubRepository> repos) {

        FeatureVector fv = new FeatureVector();

        fv.followers = profile.getFollowers();
        fv.following = profile.getFollowing();
        fv.repoCount = repos.size();

        fv.bioLength = profile.getBio() == null ? 0 : profile.getBio().length();

        fv.accountAgeDays = (int) Duration.between(
                Instant.parse(profile.getCreated_at()),
                Instant.now()).toDays();

        int totalStars = 0;
        int totalForks = 0;
        int descriptionCount = 0;

        for (GithubRepository repo : repos) {

            totalStars += repo.getStargazers_count();
            totalForks += repo.getForks_count();

            if (repo.getDescription() != null)
                descriptionCount++;
        }

        fv.totalStars = totalStars;
        fv.totalForks = totalForks;

        if (repos.size() > 0) {
            fv.avgStars = (double) totalStars / repos.size();
            fv.repoWithDescriptionPercent = (double) descriptionCount / repos.size();
        }

        return fv;
    }
}