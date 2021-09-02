import decode from 'jwt-decode'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

import { ProfileForm } from '../components/ProfileForm'
import { setupAPIClient } from '../services/api'
import { authenticatedUserRoute } from '../utils/authenticatedUserRoute'

type Role = 'ADMIN' | 'USER'

type User = {
  id: string
  name: string
  email: string
  role: Role
}

type ProfilePageProps = {
  user: User
}

export default function ProfilePage({ user }: ProfilePageProps) {
  return <ProfileForm user={user} />
}

export const getServerSideProps: GetServerSideProps = authenticatedUserRoute(async ctx => {
  const { userId } = ctx.query
  const { accessToken } = parseCookies(ctx)
  const { role } = decode<{ role: Role }>(accessToken)

  const api = setupAPIClient(ctx)

  const { data: user } = await api.get<User>(role === 'ADMIN' ? `users/${userId}` : 'me')

  return {
    props: {
      user
    }
  }
})
