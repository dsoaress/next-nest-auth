import axios, { AxiosError } from 'axios'
import { GetServerSidePropsContext } from 'next'
import router from 'next/router'
import { parseCookies } from 'nookies'

import { destroyCookies } from '@/utils/destroyCookies'
import { setCookies } from '@/utils/setCookies'

let isRefreshing = false
let failedRequestsQueued: any[] = []

export function setupAPIClient(ctx: GetServerSidePropsContext | undefined = undefined) {
  let cookies = parseCookies(ctx)

  const authorization = cookies.accessToken
    ? { headers: { Authorization: `Bearer ${cookies.accessToken}` } }
    : {}

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    ...authorization
  })

  api.interceptors.response.use(
    response => {
      return response
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        cookies = parseCookies(ctx)

        const { refreshToken } = cookies
        const originalConfig = error.config

        if (!isRefreshing) {
          isRefreshing = true

          api
            .post('session/refresh-token', { refreshToken })
            .then(response => {
              const { accessToken, refreshToken } = response.data

              setCookies({
                ctx,
                accessToken,
                refreshToken
              })

              failedRequestsQueued.forEach(request => request.onSuccess(accessToken))
              failedRequestsQueued = []
            })
            .catch(error => {
              failedRequestsQueued.forEach(request => request.onFailure(error))
              failedRequestsQueued = []

              destroyCookies(ctx)

              if (process.browser) {
                router.push('/auth')
              }
            })
            .finally(() => {
              isRefreshing = false
            })

          return new Promise((resolve, reject) => {
            failedRequestsQueued.push({
              onSuccess: (token: string) => {
                originalConfig.headers['Authorization'] = `Bearer ${token}`

                resolve(api(originalConfig))
              },
              onFailure: (error: AxiosError) => {
                reject(error)
              }
            })
          })
        }
      }

      return Promise.reject(error)
    }
  )

  return api
}

export const api = setupAPIClient()
