import decode from 'jwt-decode'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { parseCookies } from 'nookies'

import { Role } from '@/types/Role'
import { validateUserPermissions } from '@/utils/validateUserPermissions'

type Options = {
  roles: Role[]
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

    const { role: userRole } = decode<{ role: Role }>(accessToken)

    if (options) {
      const userHasValidPermissions = validateUserPermissions({
        userRole,
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
