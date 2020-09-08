import { Repo } from 'types/Repo';
import { UserData } from 'types/UserData';

/* --- STATE --- */
export interface GithubRepoFormState {
  username: string;
  loading: boolean;
  error?: RepoErrorType | null;
  repositories: Repo[];
  userData: UserData[];
}

export enum RepoErrorType {
  RESPONSE_ERROR = 1,
  USER_NOT_FOUND = 2,
  USERNAME_EMPTY = 3,
  USER_HAS_NO_REPO = 4,
  GITHUB_RATE_LIMIT = 5,
}

/* 
  If you want to use 'ContainerState' keyword everywhere in your feature folder, 
  instead of the 'HomePageState' keyword.
*/
export type ContainerState = GithubRepoFormState;
