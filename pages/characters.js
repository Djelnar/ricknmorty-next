import React from 'react'
import ErrorPage from 'next/error'
import Link from 'next/link'
import { range } from 'ramda'
import { getCharacter } from 'rickmortyapi'
import { Flex, Box } from 'grid-styled'
import { Header } from 'components/Header'
import { Card } from 'components/Card'
import { PageTitle } from 'ui/PageTitle'
import { CardImage } from 'components/Card/CardImage'
import { Button } from 'ui/Button'
/* eslint-disable no-magic-numbers */


export default class extends React.Component {
  static getInitialProps = async ({ query }) => {
    const { page = 1 } = query

    const characters = await getCharacter({ page })

    if (characters.error) {
      return {
        error: characters.error,
        status: characters.status,
      }
    }

    return {
      ...characters,
      page,
    }
  }

  render = () => {
    const {
      results: characters = [],
      info: { pages } = {},
      page,
      error,
      status,
    } = this.props

    if (error) {
      return (<ErrorPage statusCode={status} />)
    }

    const pagesArray = range(1, pages + 1)
      .filter((p) => p !== Number(page))

    return (
      <>
        <Header />
        <PageTitle>Characters</PageTitle>
        <Flex flexWrap="wrap">
          {
            characters.length && characters
              .map(({
                id,
                name,
                image,
                gender,
                status: aliveStatus,
                origin,
                location: characterLocation,
              }) => ((
                <Box key={id} width={[1, 1 / 2, 1 / 4]}>
                  <Card>
                    <CardImage src={image} alt={name} />
                    <p>{name}</p>
                    <p>Gender: {gender}</p>
                    <p>Status: {aliveStatus}</p>
                    <p>From: {origin.name}</p>
                    <p>Location: {characterLocation.name}</p>
                  </Card>
                </Box>
              )))
          }
        </Flex>
        <Flex flexWrap="wrap" p="8px">
          {
            pagesArray
              .map((p) => (
                <Link key={p} passHref href={`/characters?page=${p}`}>
                  <Button>{p}</Button>
                </Link>
              ))
          }
        </Flex>
      </>
    )
  }
}
