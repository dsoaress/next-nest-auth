import { useUser } from '../contexts/UserContext'
import { Role } from '../types/Role'
import { validateUserPermissions } from '../utils/validateUserPermissions'

type UseCanPros = {
  roles: Role[]
}

export function useCan({ roles }: UseCanPros) {
  const { user } = useUser()

  if (!user) {
    return false
  }

  const userHasValidPermissions = validateUserPermissions({
    userRole: user.role,
    roles
  })

  return userHasValidPermissions
}
