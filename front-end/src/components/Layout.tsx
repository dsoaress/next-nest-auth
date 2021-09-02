import { Center } from '@chakra-ui/react'
import { ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return <Center height="100vh">{children}</Center>
}
