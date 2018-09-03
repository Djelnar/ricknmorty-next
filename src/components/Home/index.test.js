/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import { Home } from './index'
import { Title } from './Title'


describe('Home Component', () => {
  it('should render correctly', () => {
    const output = renderer.create((
      <Home>
        <Title>Home Title</Title>
      </Home>
    )).toJSON()

    expect(output).toMatchSnapshot()
  })
})
