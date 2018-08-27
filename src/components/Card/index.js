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

  p {
    margin: 6px;
  }
`


export const Card = ({ children }) => (
  <Wrapper>
    <Inner>
      {children}
    </Inner>
  </Wrapper>
)
