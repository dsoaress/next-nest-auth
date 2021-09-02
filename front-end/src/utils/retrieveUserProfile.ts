import { api } from '@/services/api'
import { User } from '@/types/User'

export async function retrieveUserProfile(userId?: string) {
  let user: User | null = null

  try {
    const { data } = await api.get<User>(userId ? `users/${userId}` : 'me')

    user = data
  } catch (error) {
    console.log(error)
  }

  return user
}
