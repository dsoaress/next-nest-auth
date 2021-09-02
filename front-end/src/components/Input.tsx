import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
  InputProps as ChakraInputProps
} from '@chakra-ui/react'
import { ReactElement } from 'react'
import { forwardRef, ForwardRefRenderFunction } from 'react'
import { FieldError } from 'react-hook-form'

interface InputProps extends ChakraInputProps {
  name: string
  label?: string
  icon?: ReactElement
  error?: FieldError
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, icon, error = null, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={name} id={name}>
        {label}
      </FormLabel>
      <InputGroup>
        {icon && <InputLeftElement pointerEvents="none">{icon}</InputLeftElement>}
        <ChakraInput name={name} id={name} ref={ref} {...rest} />
      </InputGroup>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)
