import { Heading, Text } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useUser } from '../contexts/UserContext'
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
  const { signUp, isLoading } = useUser()

  const signUpFormSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required()
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signUpFormSchema)
  })

  const { errors } = formState

  const handleSignUp: SubmitHandler<SignUpFormData> = async values => {
    await signUp(values)
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
