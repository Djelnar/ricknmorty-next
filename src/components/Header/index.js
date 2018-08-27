import React from 'react'
import Link from 'next/link'
import { HeaderLink } from 'ui/HeaderLink'
import { HeaderLayout } from 'ui/Header'


export const Header = () => (
  <HeaderLayout>
    <Link href="/characters" passHref>
      <HeaderLink>Characters</HeaderLink>
    </Link>
    <Link href="/locations" passHref>
      <HeaderLink>Locations</HeaderLink>
    </Link>
    <Link href="/episodes" passHref>
      <HeaderLink>Episodes</HeaderLink>
    </Link>
  </HeaderLayout>
)
