/*
 * GithubRepoForm Slice
 *
 * Here we define:
 * - The shape of our container's slice of Redux store,
 * - All the actions which can be triggered for this slice, including their effects on the store.
 *
 * Note that, while we are using dot notation in our reducer, we are not actually mutating the state
 * manually. Under the hood, we use immer to apply these updates to a new copy of the state.
 * Please see https://immerjs.github.io/immer/docs/introduction for more information.
 *
 */

import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState, RepoErrorType } from './types';
import { Repo } from 'types/Repo';
import { UserData } from 'types/UserData';

// The initial state of the GithubRepoForm container
export const initialState: ContainerState = {
  username: '',
  repositories: [],
  userData: [],
  loading: false,
  error: null,
};

 
const githubRepoFormSlice = createSlice({
  name: 'githubRepoForm',
  initialState,
  reducers: {
    changeUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },

    loadRepos(state) {
      state.loading = true;
      state.error = null;
      state.repositories = [];
    },
    reposLoaded(state, action: PayloadAction<Repo[]>) {
      const repos = action.payload;
      state.repositories = repos;
      state.loading = false;
    },
    sortRepos(state, action: PayloadAction<boolean>) { 
      const repos = [...state.repositories].sort((a, b) => {
        if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
      });  
       
      state.repositories = repos
 
      //if ascending is false sort descending
      if (action.payload === false)
      state.repositories.reverse()     
    },

    loadUser(state) {
      state.loading = true;
      state.error = null;
      state.userData = [];
    },
    userLoaded(state, action: PayloadAction<UserData[]>) {
      const userData = action.payload;
      state.userData = userData;
      state.loading = false;
    },
 
    repoError(state, action: PayloadAction<RepoErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions, reducer, name: sliceKey } = githubRepoFormSlice;
