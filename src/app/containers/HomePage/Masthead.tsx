import React from 'react';
import styled from 'styled-components/macro'; 
import { Title } from 'app/containers/HomePage/components/Title';
import { Lead } from 'app/containers/HomePage/components/Lead';
 
export function Masthead() {
  return (
    <Wrapper> 
      <Title>Github Profile Search App</Title>
      <Lead>
        Application searches for github repositories based on profile name.
      </Lead>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 320px;
`;
