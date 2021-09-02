import decode from 'jwt-decode'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { parseCookies } from 'nookies'

import { Role } from './retrieveUserProfile'
import { validateUserPermissions } from './validateUserPermissions'

type Options = {
  roles: Role[]
}

type User = {
  role: Role
}

export function authenticatedUserRoute(fn: GetServerSideProps, options?: Options) {
  return async (ctx: GetServerSidePropsContext) => {
    const { accessToken } = parseCookies(ctx)

    if (!accessToken) {
      return {
        redirect: {
          destination: '/auth',
          permanent: false
        }
      }
    }

    const user = decode<User>(accessToken)

    if (options) {
      const userHasValidPermissions = validateUserPermissions({
        user,
        roles: options.roles
      })

      if (!userHasValidPermissions) {
        return {
          redirect: {
            destination: '/',
            permanent: false
          }
        }
      }
    }

    return await fn(ctx)
  }
}
