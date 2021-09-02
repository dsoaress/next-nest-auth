import { Heading, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { Button } from '../components/Button'
import { useUser } from '../contexts/UserContext'

export function Home() {
  const router = useRouter()
  const { user, signOut } = useUser()

  return (
    <Stack align="center" spacing={8}>
      <Heading>Hello, {user ? user.name : 'stranger'}!</Heading>
      {user ? (
        <pre>{JSON.stringify({ user }, null, 2)}</pre>
      ) : (
        <Text>Would you like to sign in?</Text>
      )}
      {user ? (
        <>
          <Button onClick={() => router.push(`/${user.id}`)}>Edit your profile</Button>
          <Button onClick={() => signOut()} colorScheme="red">
            Sign out
          </Button>
        </>
      ) : (
        <Button onClick={() => router.push('/auth')}>Sign in</Button>
      )}
    </Stack>
  )
}
