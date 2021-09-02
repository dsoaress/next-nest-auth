import { chakra, LinkProps as ChakraLinkProps } from '@chakra-ui/react'
import NextLink from 'next/link'
import { ReactNode } from 'react'

interface LinkProps extends ChakraLinkProps {
  children: ReactNode
  href: string
}

export function Link({ children, href, ...rest }: LinkProps) {
  return (
    <NextLink href={href} passHref>
      <chakra.a transition="color 0.2s" color="pink.500" _hover={{ color: 'pink.600' }} {...rest}>
        {children}
      </chakra.a>
    </NextLink>
  )
}
