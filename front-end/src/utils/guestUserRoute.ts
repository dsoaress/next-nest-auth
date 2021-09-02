import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { parseCookies } from 'nookies'

export function guestUserRoute(fn: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext) => {
    const { accessToken } = parseCookies(ctx)

    if (accessToken) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    return await fn(ctx)
  }
}
