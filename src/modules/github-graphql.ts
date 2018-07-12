import { execute, GraphQLRequest } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';

class GitHubGraphQLClient {
  private uri = `https://api.github.com/graphql`;
  private token = process.env.VUE_APP_GITHUB_TOKEN || '';
  private link = new HttpLink({
    uri: this.uri,
    headers: {
      Authorization: `bearer ${this.token}`,
    },
  });
  public execute(operation: GraphQLRequest) {
    return execute(this.link, operation);
  }
}

export const gitHubGraphQLClient = new GitHubGraphQLClient();
