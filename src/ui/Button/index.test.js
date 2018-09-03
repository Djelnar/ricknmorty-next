/* global describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import { Button } from './index'


describe('Generic Button', () => {
  it('should render correctly', () => {
    const output = renderer.create(<Button>mockTitle</Button>).toJSON()

    expect(output).toMatchSnapshot()
  })
})

describe('Sticky Button', () => {
  it('should render correctly', () => {
    const output = renderer.create(<Button stickToBottom>mockTitle</Button>).toJSON()

    expect(output).toMatchSnapshot()
  })
})
