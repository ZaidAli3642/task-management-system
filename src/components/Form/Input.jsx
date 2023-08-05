import { Input as ChakraInput, Box } from '@chakra-ui/react'

const Input = ({ placeholder, type = 'text', name, label }) => {
  return (
    <Box className='input-container'>
      {label && (
        <label className='input-label' htmlFor={name}>
          {label}
        </label>
      )}
      <ChakraInput
        type={type}
        id={name}
        focusBorderColor='#e5ecea'
        className='input-box'
        placeholder={placeholder}
      />
    </Box>
  )
}

export default Input
