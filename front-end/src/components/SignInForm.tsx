import { Heading, Text, useToast } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useUser } from '../contexts/UserContext'
import { api } from '../services/api'
import { retrieveUserProfile } from '../utils/retrieveUserProfile'
import { setCookies } from '../utils/setCookies'
import { Button } from './Button'
import { Form } from './Form'
import { Input } from './Input'
import { Link } from './Link'

export type SignInFormData = {
  email: string
  password: string
}

export function SignInForm() {
  const router = useRouter()
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const { setUser } = useUser()

  const signInFormSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required()
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  })

  const { errors } = formState

  const handleSignIn: SubmitHandler<SignInFormData> = async ({ email, password }) => {
    setIsLoading(true)

    try {
      const { data } = await api.post('session', {
        email,
        password
      })

      setCookies({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken
      })

      const userData = await retrieveUserProfile()

      setUser(userData)
      await router.push('/')
    } catch (error) {
      if (error.response.status === 400) {
        toast({
          position: 'bottom-left',
          description: 'Invalid email or password',
          status: 'error',
          duration: 4000
        })
      } else {
        toast({
          position: 'bottom-left',
          description: 'Hmm... Something wrong happened in our side. Please try again.',
          status: 'error',
          duration: 4000
        })
      }
    }

    setIsLoading(false)
  }

  return (
    <Form onSubmit={handleSubmit(handleSignIn)}>
      <Heading>Sign in</Heading>
      <Input label="Email" type="email" error={errors.email} {...register('email')} />
      <Input label="Password" type="password" error={errors.password} {...register('password')} />
      <Button type="submit" isLoading={isLoading}>
        Sign in
      </Button>
      <Text>
        Not registered yet? <Link href="/auth/sign-up">Create and account</Link>.
      </Text>
    </Form>
  )
}
