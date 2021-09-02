import { chakra, Stack } from '@chakra-ui/react'
import { FormHTMLAttributes, ReactNode } from 'react'

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode
}

export function Form({ children, ...rest }: FormProps) {
  return (
    <chakra.form noValidate {...rest}>
      <Stack align="center" spacing={6}>
        {children}
      </Stack>
    </chakra.form>
  )
}
