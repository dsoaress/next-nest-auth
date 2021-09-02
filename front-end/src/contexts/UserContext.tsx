import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

import { ProfileFormData } from '../components/ProfileForm'
import { SignInFormData } from '../components/SignInForm'
import { SignUpFormData } from '../components/SignUpForm'
import { api } from '../services/api'
import { User } from '../types/User'
import { destroyCookies } from '../utils/destroyCookies'
import { retrieveUserProfile } from '../utils/retrieveUserProfile'
import { setCookies } from '../utils/setCookies'

type UserContextData = {
  user: User | null
  signIn: (data: SignInFormData) => Promise<void>
  signUp: (data: SignUpFormData) => Promise<void>
  signOut: () => void
  updateProfile: (userId: string, data: ProfileFormData) => Promise<void>
  isLoading: boolean
}

const UserContext = createContext({} as UserContextData)

export function UserProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const toast = useToast()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const { accessToken } = parseCookies()

    if (accessToken) {
      retrieveUserProfile().then(data => {
        setUser(data)
      })
    }
  }, [router])

  async function signIn({ email, password }: SignInFormData) {
    setIsLoading(true)

    try {
      const { data } = await api.post<{ accessToken: string; refreshToken: string }>('session', {
        email,
        password
      })

      setCookies({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken
      })

      const user = await retrieveUserProfile()

      setUser(user)

      await router.push('/')
    } catch (error: any) {
      if (error?.response?.status === 400) {
        toast({
          position: 'bottom-left',
          description: 'Invalid email or password',
          status: 'error',
          duration: 4000
        })
      } else {
        toast({
          position: 'bottom-left',
          description: 'Hmm... Something wrong happened in our side. Please try again.',
          status: 'error',
          duration: 4000
        })
      }
    }

    setIsLoading(false)
  }

  async function signUp({ name, email, password }: SignUpFormData) {
    setIsLoading(true)

    try {
      await api.post('users', {
        name,
        email,
        password
      })

      await signIn({ email, password })
    } catch (error: any) {
      if (error?.response?.status === 400) {
        toast({
          position: 'bottom-left',
          description: 'A user with this email address has already been registered.',
          status: 'error',
          duration: 4000
        })
      } else {
        toast({
          position: 'bottom-left',
          description: 'Hmm... Something wrong happened in our side. Please try again.',
          status: 'error',
          duration: 4000
        })
      }
    }

    setIsLoading(false)
  }

  function signOut() {
    setUser(null)
    destroyCookies()
  }

  async function updateProfile(userId: string, profileFormData: ProfileFormData) {
    setIsLoading(true)

    const { oldPassword, password } = profileFormData

    if (password && !oldPassword) {
      return console.log('error: old password is required')
    }

    if (!password && !oldPassword) {
      delete profileFormData.oldPassword
      delete profileFormData.password
    }

    if (!user) {
      return console.log('error: user not found')
    }

    console.log(profileFormData)

    try {
      await api.patch<User>(user.role === 'ADMIN' ? `users/${userId}` : 'me', profileFormData)

      toast({
        position: 'bottom-left',
        description: 'Profile updated.',
        status: 'success',
        duration: 4000
      })
    } catch (error: any) {
      if (error.response.data.error.message === 'Passwords do not match') {
        toast({
          position: 'bottom-left',
          description: 'Passwords do not match.',
          status: 'error',
          duration: 4000
        })
      }

      if (error.response.data.error.message === 'Email already registered') {
        toast({
          position: 'bottom-left',
          description: 'Email already registered.',
          status: 'error',
          duration: 4000
        })
      }
    }

    setIsLoading(false)
  }

  return (
    <UserContext.Provider
      value={{
        user,
        signIn,
        signUp,
        signOut,
        updateProfile,
        isLoading
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
