import { Heading, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { Button } from '../components/Button'

export function Home() {
  const { push } = useRouter()

  return (
    <Stack align="center" spacing={8}>
      <Heading>Hello, stranger!</Heading>
      <Text>Would you like to sign in?</Text>
      <Button onClick={() => push('/auth')}>Sign in</Button>
    </Stack>
  )
}
