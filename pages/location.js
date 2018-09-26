import React from 'react'
import ErrorPage from 'next/error'
import { getLocation } from 'rickmortyapi'
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

    const locationItem = await getLocation(Number(id))

    if (locationItem.error) {
      return {
        error: locationItem.error,
        status: locationItem.status,
      }
    }

    return {
      locationItem,
    }
  }

  render = () => {
    const {
      locationItem,
      error,
      status,
    } = this.props

    if (error) {
      return (<ErrorPage statusCode={status} />)
    }

    const {
      id,
      name,
      type,
      dimension,
      residents,
    } = locationItem

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
            <p>{name}</p>
            <p>
              Type:
              {type}
            </p>
            <p>
              Dimension:
              {dimension}
            </p>
            <p>Residents:</p>
            <CharactersTable all characters={residents} />
          </Card>
        </Flex>
      </>
    )
  }
}
