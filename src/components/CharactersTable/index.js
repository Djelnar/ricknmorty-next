import React from 'react'
import { Flex, Box } from 'grid-styled'
import { getCharacter } from 'rickmortyapi'
import { CardImage } from '../Card/CardImage'
/* eslint-disable no-magic-numbers */


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

    let charactersData = await getCharacter(charactersIDs)

    charactersData = [].concat(charactersData)

    const charactersImages = charactersData.map(({ image }) => image)

    this.setState({
      images: charactersImages,
      loaded: true,
    })
  }


  render = () => {
    const { images, loaded } = this.state

    return loaded
      ? (
        <>
          <Flex pt={!images.length && '25%'} flexWrap="wrap">
            {
              images.map((image) => (
                <Box key={image} width={1 / 4}>
                  <CardImage
                    src={image}
                    alt=""
                  />
                </Box>
              ))
            }
          </Flex>
        </>

      )
      : null
  }
}
