import React from 'react'
import ErrorPage from 'next/error'
import { getEpisode } from 'rickmortyapi'
import { Flex } from 'grid-styled'
import { Header } from 'components/Header'
import { Card } from 'components/Card'
import { PageTitle } from 'ui/PageTitle'
import { CharactersTable } from 'components/CharactersTable'
/* eslint-disable no-magic-numbers */


export default class extends React.Component {
  static getInitialProps = async ({ query }) => {
    const { id } = query

    if (!id) {
      return {
        error: 'There is nothing here',
        status: 404,
      }
    }

    const episode = await getEpisode(Number(id))

    if (episode.error) {
      return {
        error: episode.error,
        status: episode.status,
      }
    }

    return {
      episode,
    }
  }

  render = () => {
    const {
      episode,
      error,
      status,
    } = this.props

    if (error) {
      return (<ErrorPage statusCode={status} />)
    }

    const {
      id,
      name,
      air_date: airDate,
      episode: episodeID,
      characters,
    } = episode

    return (
      <>
        <Header />
        <PageTitle>{name}</PageTitle>
        <Flex flexDirection="column" alignItems="flex-start">
          <Card>
            <p>
              ID:
              {id}
            </p>
            <p>
              {episodeID}
              {' '}
              {name}
            </p>
            <p>
              Air date:
              {airDate}
            </p>
            <p>Characters:</p>
            <CharactersTable all characters={characters} />
          </Card>
        </Flex>
      </>
    )
  }
}
