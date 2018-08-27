import React from 'react'
import Link from 'next/link'
import { Flex, Box } from 'grid-styled'
import { getCharacter } from 'rickmortyapi'
import styled, { css } from 'styled-components'
import { CardImage } from '../Card/CardImage'
/* eslint-disable no-magic-numbers */


const StyledFlex = styled(Flex)`
  @media (min-width: 640px) {
    padding-top: ${(p) => p.empty && '25%'};
  }

  ${(p) => p.limitedwidth && css`
    max-width: 600px;
    flex-wrap: wrap;
  `}
`

export const CharactersTable = class extends React.Component {
  state = {
    images: [],
    loaded: false,
  }

  componentDidMount = async () => {
    const { characters = [] } = this.props

    if (characters.length === 0) {
      this.setState({
        images: [],
        loaded: true,
      })
      return
    }

    const charactersIDs = characters
      .map((charUrl) => charUrl.replace(/^.+\//, ''))

    const charactersResponse = await getCharacter(charactersIDs)

    // May be an array or a single object
    const charactersData = Array.isArray(charactersResponse)
      ? charactersResponse
      : [charactersResponse]

    const charactersImages = charactersData
      .map(({ image, id }) => ({ image, id }))

    this.setState({
      images: charactersImages,
      loaded: true,
    })
  }


  render = () => {
    const { images, loaded } = this.state
    const { all } = this.props

    return loaded
      ? (
        <>
          <StyledFlex
            limitedwidth={all ? 1 : 0}
            empty={images.length === 0 ? 1 : 0}
          >
            {
              images.map(({ image, id }) => (
                <Link
                  key={id}
                  href={`/character?id=${id}`}
                >
                  <Box
                    pr={all ? '10px' : 0}
                    pb={all ? '10px' : 0}
                    width={1 / 4}
                  >
                    <CardImage
                      link
                      src={image}
                      alt=""
                    />
                  </Box>
                </Link>
              ))
            }
          </StyledFlex>
        </>

      )
      : null
  }
}
