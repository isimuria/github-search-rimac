import { call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { request } from 'utils/request';
import { selectUsername } from './selectors';
import { actions } from './slice';
import { Repo } from 'types/Repo';
import { UserData } from 'types/UserData';

import { RepoErrorType } from './types';

/**
 * Github user request/response handler
 */
export function* getUser() {
   
  // Select username from store
  const username: string = yield select(selectUsername);
  if (username.length === 0) {
    yield put(actions.repoError(RepoErrorType.USERNAME_EMPTY));
    return;
  }

  // Get cached data and return if it exists
  const cachekey = username   
  const cached = JSON.parse(localStorage.getItem(cachekey)!);
  
  if (cached) {
  yield put(actions.userLoaded(cached));
  return;
  }
  
  yield delay(500);

  // Api call
  const requestUserURL = `https://api.github.com/users/${username}`;
  const requestOptions = {
    method: 'get',
    headers: new Headers({
      Authorization: 'token cb1cf5b1d3349fdf7426777f9ee47f992d3c167b',
    }),
  };

  try { 
    const userData: UserData[] = yield call(request, requestUserURL, requestOptions);

    if (userData) {
      //save to cache and load api data
      localStorage.setItem(cachekey, JSON.stringify(userData));
      yield put(actions.userLoaded(userData));
    } else {
      yield put(actions.repoError(RepoErrorType.USER_HAS_NO_REPO));
    }
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.repoError(RepoErrorType.USER_NOT_FOUND));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.repoError(RepoErrorType.GITHUB_RATE_LIMIT));
    } else {
      yield put(actions.repoError(RepoErrorType.RESPONSE_ERROR));
    }
  }
}

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  // Select username from store
  const username: string = yield select(selectUsername);
  if (username.length === 0) {
    yield put(actions.repoError(RepoErrorType.USERNAME_EMPTY));
    return;
  }

  // Get cached data and return if it exists
  const cachekey = username + "repos" 
  const cached = JSON.parse(localStorage.getItem(cachekey)!);
  
  if (cached) {
  yield put(actions.reposLoaded(cached));
  return;
  }

  yield delay(500);

  // Api call
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    const repos: Repo[] = yield call(request, requestURL)
 
    if (repos?.length > 0) { 
      //save to cache and load api data
      localStorage.setItem(cachekey, JSON.stringify(repos));
      yield put(actions.reposLoaded(repos));
    } else {
      yield put(actions.repoError(RepoErrorType.USER_HAS_NO_REPO));
    }
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.repoError(RepoErrorType.USER_NOT_FOUND));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.repoError(RepoErrorType.GITHUB_RATE_LIMIT));
    } else {
      yield put(actions.repoError(RepoErrorType.RESPONSE_ERROR));
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* githubRepoFormSaga() {
  // Watches for loadRepos actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.loadRepos.type, getRepos);
  yield takeLatest(actions.loadUser.type, getUser);
}
