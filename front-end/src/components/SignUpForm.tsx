import { Heading, Text, useToast } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { api } from '../services/api'
import { Button } from './Button'
import { Form } from './Form'
import { Input } from './Input'
import { Link } from './Link'

export type SignUpFormData = {
  name: string
  email: string
  password: string
}

export function SignUpForm() {
  const router = useRouter()
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const SignUpFormSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required()
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(SignUpFormSchema)
  })

  const { errors } = formState

  const handleSignUp: SubmitHandler<SignUpFormData> = async ({ name, email, password }) => {
    setIsLoading(true)

    try {
      await api.post('users', {
        name,
        email,
        password
      })

      await router.push('/auth')
    } catch (error) {
      if (error.response.status === 400) {
        toast({
          position: 'bottom-left',
          description: 'A user with this email address has already been registered.',
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
    <Form onSubmit={handleSubmit(handleSignUp)}>
      <Heading>Sign up</Heading>
      <Input label="Name" type="text" error={errors.name} {...register('name')} />
      <Input label="Email" type="email" error={errors.email} {...register('email')} />
      <Input label="Password" type="password" error={errors.password} {...register('password')} />
      <Button type="submit" isLoading={isLoading}>
        Sign up
      </Button>
      <Text>
        Already have an account? <Link href="/auth">Let’s log you in</Link>!
      </Text>
    </Form>
  )
}
