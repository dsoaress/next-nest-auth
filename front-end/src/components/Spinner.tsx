import { Center, Spinner as ChakraSpinner } from '@chakra-ui/react'

export function Spinner() {
  return (
    <Center position="fixed" top={0} left={0} right={0} bottom={0} color="pink.500">
      <ChakraSpinner />
    </Center>
  )
}
