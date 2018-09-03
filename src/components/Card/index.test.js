/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import { Card } from './index'
import { CardImage } from './CardImage'


describe('Card Component', () => {
  it('should render correctly', () => {
    const output = renderer.create((
      <Card>
        <CardImage src="https://rickandmortyapi.com/api/character/avatar/1.jpeg" />
        <p>Rick</p>
        <p>and</p>
        <p>Morty</p>
      </Card>
    )).toJSON()

    expect(output).toMatchSnapshot()
  })
})
