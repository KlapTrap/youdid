import { execute, GraphQLRequest } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';

class GitHubGraphQLClient {
  private uri = `/github-graphql`;
  private link = new HttpLink({
    uri: this.uri,
  });
  public execute(operation: GraphQLRequest) {
    return execute(this.link, operation);
  }
}

export const gitHubGraphQLClient = new GitHubGraphQLClient();
