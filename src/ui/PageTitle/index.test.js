/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import { PageTitle } from './index'


describe('PageTitle', () => {
  it('should render correctly', () => {
    const output = renderer.create(<PageTitle>Mock Content</PageTitle>).toJSON()

    expect(output).toMatchSnapshot()
  })
})
