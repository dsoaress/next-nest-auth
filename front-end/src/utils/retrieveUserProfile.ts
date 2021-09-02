import { api } from '../services/api'

export type UserProfile = {
  id: string
  name: string
  email: string
  role: string
} | null

export async function retrieveUserProfile() {
  let userProfile: UserProfile = null

  try {
    const { data } = await api.get<UserProfile>('me')

    userProfile = data
  } catch (error) {
    console.log(error)
  }

  return userProfile
}
