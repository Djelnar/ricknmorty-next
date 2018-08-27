import styled from 'styled-components'
import React from 'react'


const Wrapper = styled.div`
  width: 100%;
  min-width: 150px;
  padding: 8px;
  height: 100%;
`

const Inner = styled.div`
  background-color: #ffffff;
  padding: 8px;
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;

  p {
    margin: 6px 0;

    :first-child {
      margin-top: 0;
    }

    :last-of-type {
      margin-bottom: 14px;
    }
  }
`


export const Card = ({ children }) => (
  <Wrapper>
    <Inner>
      {children}
    </Inner>
  </Wrapper>
)
