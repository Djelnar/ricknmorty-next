import React from 'react'
import ErrorPage from 'next/error'
import { range } from 'ramda'
import { getLocation } from 'rickmortyapi'
import { Flex, Box } from 'grid-styled'
import { Header } from 'components/Header'
import { Card } from 'components/Card'
import { PageTitle } from 'ui/PageTitle'
import Link from 'next/link'
import { Button } from 'ui/Button'
import { CharactersTable } from 'components/CharactersTable'
/* eslint-disable no-magic-numbers */


export default class extends React.Component {
  static getInitialProps = async ({ query }) => {
    const { page = 1 } = query

    const locations = await getLocation({ page })

    if (locations.error) {
      return {
        error: locations.error,
        status: locations.status,
      }
    }

    return {
      ...locations,
      page,
    }
  }

  render = () => {
    const {
      results: locations = [],
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
        <PageTitle>Locations</PageTitle>
        <Flex flexWrap="wrap">
          {
            locations.length && locations
              .map(({ id, name, type, dimension, residents }) => (
                <Box key={id} width={[1, 1 / 2, 1 / 4]}>
                  <Card>
                    <CharactersTable characters={residents.slice(0, 4)} />
                    <p>{name}</p>
                    <p>
                      Type:
                      {type}
                    </p>
                    <p>
                      Dimension:
                      {dimension}
                    </p>
                    <Link passHref href={`/location?id=${id}`}>
                      <Button stickToBottom>More info</Button>
                    </Link>
                  </Card>
                </Box>
              ))
          }
        </Flex>
        <Flex flexWrap="wrap" p="8px">
          {
            pagesArray
              .map((p) => (
                <Link key={p} passHref href={`/locations?page=${p}`}>
                  <Button>{p}</Button>
                </Link>
              ))
          }
        </Flex>
      </>
    )
  }
}
