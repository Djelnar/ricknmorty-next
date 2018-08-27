import styled from 'styled-components'


export const Button = styled.a`
  display: block;
  flex: 0 0 auto;
  padding: 8px;
  margin-right: 4px;
  margin-bottom: 4px;
  background-color: blue;
  text-decoration: none;
  color: #ffffff;

  align-self: flex-start;

  user-select: none;

  :hover {
    background-color: blueviolet;
  }

  :active {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 3px;
  }

  margin-top: ${(p) => p.stickToBottom && 'auto'};
`
