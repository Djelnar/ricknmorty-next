import React from 'react'
import { Header } from 'components/Header'
import { Home } from 'components/Home'
import { Title } from 'components/Home/Title'


export default () => (
  <>
    <Header />
    <Home>
      <Title>Welcome to Rick & Morty</Title>
    </Home>
  </>
)
