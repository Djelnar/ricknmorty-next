/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import { HeaderLink } from './index'


describe('HeaderLink', () => {
  it('should render correctly', () => {
    const output = renderer.create(<HeaderLink href="/mock">Mock Content</HeaderLink>).toJSON()

    expect(output).toMatchSnapshot()
  })
})
