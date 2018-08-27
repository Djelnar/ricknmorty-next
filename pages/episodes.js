import React from 'react'
import ErrorPage from 'next/error'
import { getEpisode } from 'rickmortyapi'
import { Flex, Box } from 'grid-styled'
import { Header } from 'components/Header'
import { Card } from 'components/Card'
import { PageTitle } from 'ui/PageTitle'
import { Button } from 'ui/Button'
import Link from 'next/link'
import { CharactersTable } from 'components/CharactersTable'
/* eslint-disable no-magic-numbers */


const pages = [
  '01',
  '02',
  '03',
]

export default class extends React.Component {
  static getInitialProps = async ({ query }) => {
    const { series = '01' } = query

    if (!pages.includes(series)) {
      return {
        error: 'There is nothing here',
        status: 404,
      }
    }

    const episodes = await getEpisode({ episode: `S${series}` })

    if (episodes.error) {
      return {
        error: episodes.error,
        status: episodes.status,
      }
    }

    return {
      ...episodes,
      series,
    }
  }

  render = () => {
    const {
      results: episodes = [],
      series,
      error,
      status,
    } = this.props

    if (error) {
      return (<ErrorPage statusCode={status} />)
    }

    return (
      <>
        <Header />
        <PageTitle>Episodes of S{series}</PageTitle>
        <Flex flexWrap="wrap">
          {
            episodes.length && episodes
              .map(({ id, name, episode, air_date: airDate, characters }) => (
                <Box key={id} width={[1, 1 / 2, 1 / 4]}>
                  <Card>
                    <CharactersTable characters={characters.slice(4, 8)} />
                    <p>{name}</p>
                    <p>{episode}</p>
                    <p>{airDate}</p>
                    <Link passHref href={`/episode?id=${id}`}>
                      <Button stickToBottom>More info</Button>
                    </Link>
                  </Card>
                </Box>
              ))
          }
        </Flex>
        <Flex p="8px">
          {
            pages
              .filter((p) => p !== series)
              .map((p) => (
                <Link key={p} passHref href={`/episodes?series=${p}`}>
                  <Button>S{p}</Button>
                </Link>
              ))
          }
        </Flex>
      </>
    )
  }
}
