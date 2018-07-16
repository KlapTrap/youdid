import { HttpLink } from 'apollo-link-http';
import { map, catchError, switchMap } from 'rxjs/operators';
import { from, of } from 'rxjs';

class GitHubApiClient {
  private uri = `/github-api/`;
  private link = new HttpLink({
    uri: this.uri,
  });

  public fetch(path: string) {
    return from(fetch(`${this.uri}${path}`)).pipe(
      switchMap(r => from(r.json())),
    );
  }
}

export const gitHubApiClient = new GitHubApiClient();
