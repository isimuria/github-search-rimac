import React, { useEffect, useState  } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { FormLabel } from 'app/components/FormLabel';
import { Input } from './components/Input';
import { Link } from './components/Link';
import { RepoItem } from './RepoItem';
import { TextButton } from './components/TextButton';
import { sliceKey, reducer, actions } from './slice';
import { githubRepoFormSaga } from './saga';
import {
  selectUsername,
  selectRepos,
  selectUserData,
  selectLoading,
  selectError,
} from './selectors';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { RepoErrorType } from './types';
import { ReactComponent as NewWindowIcon } from './assets/new-window.svg';
import { ReactComponent as SortIcon } from './assets/sort.svg';

export function GithubRepoForm() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: githubRepoFormSaga });
 
  console.log(process.env.GITHUB_KEY)
  const username = useSelector(selectUsername);
  const repos = useSelector(selectRepos);
  const userData = useSelector(selectUserData);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [asc, setOrder] = useState(true);
   
  const dispatch = useDispatch();

  const onChangeUsername = (evt: React.ChangeEvent<HTMLInputElement>) => {
    
    dispatch(actions.changeUsername(evt.currentTarget.value));
    dispatch(actions.loadRepos()); 
    dispatch(actions.loadUser());
  };

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };
  useEffectOnMount(() => {
    // When initial state username is not null, submit the form to load repos
    if (username && username.trim().length > 0) {
      dispatch(actions.loadRepos());
      dispatch(actions.loadUser());
    }
  });

  const onSubmitForm = (evt?: React.FormEvent<HTMLFormElement>) => {
    /* istanbul ignore next  */
    if (evt !== undefined && evt.preventDefault) {
      evt.preventDefault();
    }
  };

  const onSort = () => {
    console.log("sorting...")
    setOrder(asc => !asc)
    dispatch(actions.sortRepos(asc));
  } 
 
  return (
 
    <Wrapper>
      <FormGroup onSubmit={onSubmitForm}>
        <FormLabel>Github Username</FormLabel>
        <InputWrapper>
          <Input
            type="text"
            placeholder="Type any Github username"
            value={username}
            onChange={onChangeUsername}
          />
          {isLoading && <LoadingIndicator small />}
        </InputWrapper>
      </FormGroup>

      {repos?.length > 0 ? (
        <Results>
          <User>
            <UserAvatar
              src={userData['avatar_url']}
            />
            <UserInfo>
              <P>Email: {userData['email'] ? userData['email'] : "n/a"}</P>
              <P>User: {userData['login']}</P>
              <P>Url: <Link href={userData['html_url']}>{userData['html_url']}</Link></P>
            </UserInfo>
          </User>
 
          <SortWrapper>
            <Name onClick={() => onSort()}>Repo Name<Sort /> </Name>
            <Description>Description</Description>
            <Info>  
                <NewWindowIcon /> 
            </Info>
          </SortWrapper>

          {repos.map(repo => (
            <RepoItem
              key={repo.id}
              name={repo.name}
              description={repo.description}
              starCount={repo.stargazers_count}
              url={repo.html_url}
            />
          ))}
        </Results>
      ) : error ? (
        <ErrorText>{repoErrorText(error)}</ErrorText>
      ) : null}
    </Wrapper>
  );
}

export const repoErrorText = (error: RepoErrorType) => {
  switch (error) {
    case RepoErrorType.USER_NOT_FOUND:
      return 'There is no such user 😞';
    case RepoErrorType.USERNAME_EMPTY:
      return 'Type any Github username';
    case RepoErrorType.USER_HAS_NO_REPO:
      return 'User has no repository 🥺';
    case RepoErrorType.GITHUB_RATE_LIMIT:
      return 'Looks like github api`s rate limit(60 request/h) has exceeded 🤔';
    default:
      return 'An error has occurred!';
  }
};

const Wrapper = styled.div`
  ${TextButton} {
    margin: 16px 0;
    font-size: 0.875rem;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;

  ${Input} {
    width: ${100 / 3}%;
    margin-right: 0.5rem;
  }
`;

const ErrorText = styled.span`
  color: ${p => p.theme.text};
`;

const FormGroup = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  ${FormLabel} {
    margin-bottom: 0.25rem;
    margin-left: 0.125rem;
  }
`;

const Sort = styled(SortIcon)`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  min-height: 2.75rem;
  font-weight: 500;
`;

const UserInfo = styled.div`
  flex: 1;
  margin: 1rem;
  font-weight: normal;
  flex-direction: column;
  margin: 1;
  padding: 0;
  color: ${p => p.theme.textSecondary};
  font-size: 0.95rem;
`;

const UserAvatar = styled.img`
  flex: 2;
  border-radius: 12% !important;

  max-width: 6rem;
  max-height: 8rem;
  width: auto;
  height: auto;
`;

const Results = styled.div``;

const P = styled.p`
  
`; 

const SortWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  min-height: 2.75rem;
  font-weight: 500;
  color: ${p => p.theme.text};

  &:nth-child(odd) {
    background-color: ${p => p.theme.backgroundVariant};
  }
`;

const Name = styled.div`
  flex: 1;
  padding: 0.625rem 0;
  cursor: pointer;
`;
 
const Description = styled.div`
  flex: 2;
  padding: 0.625rem 0.625rem  ;
`;

const Info = styled.div`
  display: flex;
`;

