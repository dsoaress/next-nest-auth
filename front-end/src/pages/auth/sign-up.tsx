import { GetServerSideProps } from 'next'

import { SignUpForm } from '../../components/SignUpForm'
import { guestUserRoute } from '../../utils/guestUserRoute'

export default function SignUpPage() {
  return <SignUpForm />
}

export const getServerSideProps: GetServerSideProps = guestUserRoute(async () => {
  return {
    props: {}
  }
})
