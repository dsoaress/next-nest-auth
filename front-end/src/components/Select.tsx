import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps
} from '@chakra-ui/react'
import { forwardRef, ForwardRefRenderFunction } from 'react'
import { FieldError } from 'react-hook-form'

type Option = {
  name: string
  value: string
}

interface SelectProps extends ChakraSelectProps {
  name: string
  label?: string
  options: Option[]
  error?: FieldError
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  { name, label, error = null, options, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={name} id={name}>
        {label}
      </FormLabel>
      <ChakraSelect name={name} id={name} ref={ref} {...rest}>
        {options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.name}
          </option>
        ))}
      </ChakraSelect>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  )
}

export const Select = forwardRef(SelectBase)
