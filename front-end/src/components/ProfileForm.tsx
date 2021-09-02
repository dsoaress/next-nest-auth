import { Heading } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { Button } from '@/components/Button'
import { Can } from '@/components/Can'
import { Form } from '@/components/Form'
import { Input } from '@/components/Input'
import { Select } from '@/components/Select'
import { useUser } from '@/contexts/UserContext'

type Role = 'ADMIN' | 'USER'

type User = {
  id: string
  name: string
  email: string
  role: Role
}

type ProfileFormProps = {
  user: User
}

export type ProfileFormData = {
  name: string
  email: string
  role: Role
  oldPassword?: string
  password?: string
}

export function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter()
  const { updateProfile, isLoading } = useUser()

  const profileFormSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required().email()
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(profileFormSchema),
    defaultValues: {
      ...user,
      oldPassword: null,
      password: null
    }
  })

  const { errors } = formState

  const handleProfile: SubmitHandler<ProfileFormData> = async values => {
    await updateProfile(user.id, values)
  }

  const roleOptions = [
    {
      name: 'User',
      value: 'USER'
    },
    {
      name: 'Admin',
      value: 'ADMIN'
    }
  ]

  return (
    <Form onSubmit={handleSubmit(handleProfile)}>
      <Heading>Edit your profile</Heading>
      <Input label="Name" type="text" error={errors.name} {...register('name')} />
      <Input label="Email" type="email" error={errors.email} {...register('email')} />
      <Input
        label="Old password"
        type="password"
        error={errors.password}
        {...register('oldPassword')}
      />
      <Input
        label="New password"
        type="password"
        error={errors.password}
        {...register('password')}
      />
      <Can roles={['ADMIN']}>
        <Select label="Role" error={errors.role} {...register('role')} options={roleOptions} />
      </Can>
      <Button type="submit" isLoading={isLoading}>
        Save
      </Button>
      <Button onClick={() => router.push('/')} variant="outline">
        Back to home
      </Button>
    </Form>
  )
}
