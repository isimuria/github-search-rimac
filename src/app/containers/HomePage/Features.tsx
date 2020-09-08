import React from 'react';
import styled from 'styled-components/macro'; 
import { SubTitle } from 'app/containers/HomePage/components/SubTitle';
import { P } from './components/P'; 
import { GithubRepoForm } from 'app/containers/GithubRepoForm'; 
import { ReactComponent as GithubIcon } from './assets/github.svg';
  
export function Features() {
 
  return (
    <> 
      <List>
        <Feature>
          <GithubIcon className="feature-icon" />
          <Content>
            <SubTitle>Github Profile Search</SubTitle>
            <P> 
              Please enter a github profile name below.
            </P>
            <GithubRepoForm />
          </Content>
        </Feature>
           
      </List>
    </>
  );
}
 

const Feature = styled.li`
  display: flex;
  margin: 3.25rem 0 6.25rem 2.25rem;

  .feature-icon {
    width: 9.25rem;
    height: 9.25rem;
    margin-right: 2.25rem;
    flex-shrink: 0;
  }
`;
const Content = styled.div`
  flex: 1;
`;

const List = styled.ul`
  padding: 0;
  margin: 3.25rem 0 0 0;
`;
