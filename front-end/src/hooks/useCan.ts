import { useUser } from '../contexts/UserContext'
import { validateUserPermissions } from '../utils/validateUserPermissions'

type Role = 'ADMIN' | 'USER'

type UseCanPros = {
  roles: Role[]
}

export function useCan({ roles }: UseCanPros) {
  const { user } = useUser()

  if (!user) {
    return false
  }

  const userHasValidPermissions = validateUserPermissions({
    user,
    roles
  })

  return userHasValidPermissions
}
