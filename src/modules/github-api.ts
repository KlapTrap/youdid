import { HttpLink } from 'apollo-link-http';
import { map, catchError, switchMap } from 'rxjs/operators';
import { from, of } from 'rxjs';

class GitHubApiClient {
  private uri = `https://api.github.com/`;
  private token = process.env.VUE_APP_GITHUB_TOKEN || '';
  private link = new HttpLink({
    uri: this.uri,
    headers: {
      Authorization: `bearer ${this.token}`
    }
  });

  public fetch(path: string) {
    return from(
      fetch(`${this.uri}${path}`, {
        headers: {
          Authorization: `bearer ${this.token}`
        }
      })
    ).pipe(
      switchMap(r => from(r.json())),
      catchError(e => of(null))
    );
  }
}

export const gitHubApiClient = new GitHubApiClient();
