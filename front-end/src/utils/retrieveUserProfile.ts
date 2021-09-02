import { api } from '../services/api'

export type Role = 'ADMIN' | 'USER'

export type UserProfile = {
  id: string
  name: string
  email: string
  role: Role
} | null

export async function retrieveUserProfile(userId?: string) {
  let user: UserProfile = null

  try {
    const { data } = await api.get<UserProfile>(userId ? `users/${userId}` : 'me')

    user = data
  } catch (error) {
    console.log(error)
  }

  return user
}
