import React from 'react'
import Link from 'next/link'
import { HeaderLink } from 'ui/HeaderLink'
import { HeaderLayout } from 'ui/Header'


export const Header = () => (
  <HeaderLayout>
    <Link href="/characters" passHref prefetch>
      <HeaderLink>Characters</HeaderLink>
    </Link>
    <Link href="/locations" passHref prefetch>
      <HeaderLink>Locations</HeaderLink>
    </Link>
    <Link href="/episodes" passHref prefetch>
      <HeaderLink>Episodes</HeaderLink>
    </Link>
  </HeaderLayout>
)
