import { Input as ChakraInput, Box, FormErrorMessage,Textarea } from '@chakra-ui/react'

const Input = ({ placeholder, type = 'text', name, istextarea, label, onChange, errorMessage, ...props }) => {
  
  return (
     
    <Box className='input-container' {...props}>
      {label && (
        <label className='input-label' htmlFor={name}>
          {label}
        </label>
      )}
       {istextarea  ? (
        <Textarea
        style={{ height: '150px'}}
          onChange={e => onChange(e)}
          name={name}
          id={name}
          size={'lg'}
          focusBorderColor='#e5ecea'
          className='input-box'
          placeholder={placeholder}
          isInvalid={errorMessage}
          fontWeight={400}
          _focus={{ fontWeight: 600 }}
          fontSize='16px'
          _placeholder={{ fontWeight: 400 }}
        />
      ) : (
      <ChakraInput isInvalid={errorMessage} onChange={e => onChange(e)} type={type} name={name} id={name} focusBorderColor='#e5ecea' className='input-box' placeholder={placeholder} fontWeight={400} _focus={{ fontWeight: 600 }} fontSize='16px' _placeholder={{ fontWeight: 400 }} />)}
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </Box>
  ) 
}

export default Input
