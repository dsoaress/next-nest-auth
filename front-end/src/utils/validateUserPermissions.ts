import { Role } from './retrieveUserProfile'

type User = {
  role: Role
}

type ValidateUserPermissionsParams = {
  user: User
  roles?: Role[]
}

export function validateUserPermissions({ user, roles }: ValidateUserPermissionsParams) {
  if (roles && roles.length > 0) {
    const hasPermission = roles.some(role => {
      return user.role.includes(role)
    })

    if (!hasPermission) {
      return false
    }
  }

  return true
}
