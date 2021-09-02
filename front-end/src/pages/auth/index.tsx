import { GetServerSideProps } from 'next'

import { SignInForm } from '@/components/SignInForm'
import { guestUserRoute } from '@/utils/guestUserRoute'

export default function SignInPage() {
  return <SignInForm />
}

export const getServerSideProps: GetServerSideProps = guestUserRoute(async () => {
  return {
    props: {}
  }
})
