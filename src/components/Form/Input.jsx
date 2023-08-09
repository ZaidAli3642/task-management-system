import { Input as ChakraInput, Box, FormErrorMessage } from '@chakra-ui/react'

const Input = ({ placeholder, type = 'text', name, label, onChange, errorMessage, ...props }) => {
  return (
    <Box className='input-container' {...props}>
      {label && (
        <label className='input-label' htmlFor={name}>
          {label}
        </label>
      )}
      <ChakraInput isInvalid={errorMessage} onChange={e => onChange(e)} type={type} name={name} id={name} focusBorderColor='#e5ecea' className='input-box' placeholder={placeholder} />
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </Box>
  )
}

export default Input
