import styled, { css } from 'styled-components'


export const CardImage = styled.img`
  display: block;
  width: 100%;
  object-fit: cover;

  ${(p) => p.link && css`
    cursor: pointer;
    transition-property: transform;
    transition-timing-function: ease-in;
    transition-duration: 150ms;
    &:hover {
      transform: scale(1.1);
      transition-timing-function: ease-out;
    }
  `}
`
