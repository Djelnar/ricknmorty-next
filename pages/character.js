import React from 'react'
import ErrorPage from 'next/error'
import Link from 'next/link'
import { getCharacter, getEpisode } from 'rickmortyapi'
import { Flex, Box } from 'grid-styled'
import { Header } from 'components/Header'
import { Card } from 'components/Card'
import { PageTitle } from 'ui/PageTitle'
import { CardImage } from 'components/Card/CardImage'
import { Button } from 'ui/Button'
import styled from 'styled-components'
/* eslint-disable no-magic-numbers, jsx-a11y/anchor-is-valid */


const ActionButton = Button.withComponent('div')

const StyledLink = styled.a`
  color: blueviolet;
  :not(:hover) {
    text-decoration: none;
  }
`

export default class extends React.Component {
  static getInitialProps = async ({ query }) => {
    const { id } = query

    if (!id) {
      return {
        error: 'There is nothing here',
        status: 404,
      }
    }

    const character = await getCharacter(Number(id))

    if (character.error) {
      return {
        error: character.error,
        status: character.status,
      }
    }

    const { episode } = character

    const epidodeIDs = episode
      .map((e) => e.replace(/^.+\//, ''))

    const episodesResponse = await getEpisode(epidodeIDs)

    const episodesData = Array.isArray(episodesResponse)
      ? episodesResponse
      : [episodesResponse]

    const episodesTitles = episodesData
      .map(({
        name,
        episode: episodeCode,
        id: episodeID,
      }) => ({ name, episodeID, episodeCode }))

    return {
      character,
      episodesTitles,
    }
  }

  state = {
    showMore: false,
  }

  toggleShowMore = () => {
    this.setState((prevState) => ({
      showMore: !prevState.showMore,
    }))
  }

  render = () => {
    const { showMore } = this.state

    const {
      character,
      episodesTitles,
      error,
      status,
    } = this.props

    if (error) {
      return (<ErrorPage statusCode={status} />)
    }

    const {
      image,
      name,
      gender,
      status: aliveStatus = 'unknown',
      origin,
      location: characterLocation,
      species,
      type,
    } = character

    return (
      <>
        <Header />
        <PageTitle>{name}</PageTitle>

        <Card>
          <Flex flexWrap="wrap">
            <Box p="8px" width={[1, 1, 1 / 4]}>
              <CardImage src={image} alt={name} />
            </Box>
            <Box p="8px" width={[1, 1, 3 / 4]}>
              <p>{name}</p>
              <p>Gender: {gender}</p>
              <p>Status: {aliveStatus}</p>
              <p>Species: {species}</p>
              <p>Type: {type || 'unknown'}</p>
              <p>From: {origin.name}</p>
              <p>Location:{' '}
                <Link href={`/location?id=${characterLocation.url.replace(/^.+\//, '')}`} passHref>
                  <StyledLink>{characterLocation.name}</StyledLink>
                </Link>
              </p>
              <p>Episodes:</p>
              <Flex flexWrap="wrap">
                {
                  episodesTitles
                    .slice(0, showMore ? undefined : 5)
                    .map(({ name: episodeName, episodeID, episodeCode }) => (
                      <Link key={episodeID} href={`/episode?id=${episodeID}`} passHref>
                        <Button>{episodeCode} {episodeName}</Button>
                      </Link>
                    ))
                }
                {
                  episodesTitles.length > 5 && (
                    <ActionButton onClick={this.toggleShowMore}>
                      {showMore ? 'Show less' : 'Show all'}
                    </ActionButton>
                  )
                }
              </Flex>
            </Box>
          </Flex>
        </Card>
      </>
    )
  }
}
