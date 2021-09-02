import { Heading, Text } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { Button } from './Button'
import { Form } from './Form'
import { Input } from './Input'
import { Link } from './Link'

export type SignInFormData = {
  email: string
  password: string
}

export function SignInForm() {
  const signInFormSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required()
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  })

  const { errors } = formState

  const handleSignIn: SubmitHandler<SignInFormData> = async ({ email, password }) => {
    console.log(email, password)
  }

  return (
    <Form onSubmit={handleSubmit(handleSignIn)}>
      <Heading>Sign in</Heading>
      <Input label="Email" type="email" error={errors.email} {...register('email')} />
      <Input label="Password" type="password" error={errors.password} {...register('password')} />
      <Button type="submit">Sign in</Button>
      <Text>
        Not registered yet? <Link href="/auth/sign-up">Create and account</Link>.
      </Text>
    </Form>
  )
}
