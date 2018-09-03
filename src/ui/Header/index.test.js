/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'


import { HeaderLayout } from './index'


describe('Header', () => {
  it('should render correctly', () => {
    const output = renderer.create(<HeaderLayout>Mock Content</HeaderLayout>).toJSON()

    expect(output).toMatchSnapshot()
  })
})
