import { Heading } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'

import { authenticatedUserRoute } from '@/utils/authenticatedUserRoute'

export default function DashboardPage() {
  return (
    <div>
      <Heading>Dashboard</Heading>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = authenticatedUserRoute(
  async () => {
    return { props: {} }
  },
  { roles: ['ADMIN'] }
)
