import { parseCookies } from 'nookies'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react'

import { destroyCookies } from '../utils/destroyCookies'
import { retrieveUserProfile, UserProfile } from '../utils/retrieveUserProfile'

type UserContextData = {
  user: UserProfile
  setUser: Dispatch<SetStateAction<UserProfile>>
  signOut: () => void
}

const UserContext = createContext({} as UserContextData)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile>(null)

  useEffect(() => {
    const { accessToken } = parseCookies()

    if (accessToken) {
      retrieveUserProfile().then(data => {
        setUser(data)
      })
    }
  }, [])

  function signOut() {
    setUser(null)
    destroyCookies()
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        signOut
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
