import React from 'react';
import styled from 'styled-components/macro'; 
import { ReactComponent as NewWindowIcon } from './assets/new-window.svg';
import { A } from 'app/components/A';

interface Props {
  name: string;
  starCount: number;
  url: string;
  description: string;
}

export function RepoItem({ name, starCount, url, description }: Props) {
  return (
    <Wrapper>
      <Name>{name}</Name>
      <Description>{description ? description: "n/a"}</Description>
      <Info> 
        <A href={url} target="_blank" rel="noopener noreferrer">
          <NewWindowIcon />
        </A>
      </Info>
    </Wrapper>
  );
}
 

const Wrapper = styled.div`
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
`;

const Description = styled.div`
  flex: 2;
  padding: 0.625rem 0.625rem;
`;

const Info = styled.div`
  display: flex;
`;

 
