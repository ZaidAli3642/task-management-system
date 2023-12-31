import { Input as ChakraInput, Box, FormErrorMessage, Textarea } from '@chakra-ui/react'

const Input = ({ placeholder, type = 'text', name, label, value, sublabel, onChange, errorMessage, textArea = false, textAlign = 'start', defaultValue, isShowErrorMessage = true, ...props }) => {
  return (
    <Box className='input-container' {...props}>
      {label && (
        <label className='input-label' htmlFor={name}>
          {label}
          {sublabel && <span style={{ marginLeft: '2px', fontWeight: 400 }}>{sublabel}</span>}
        </label>
      )}
      {textArea && <Textarea value={value} defaultValue={defaultValue} isInvalid={errorMessage} minH='150px' onChange={e => onChange(e)} type={type} name={name} id={name} focusBorderColor='#e5ecea' className='input-box' placeholder={placeholder} fontWeight={400} _focus={{ fontWeight: 600 }} fontSize='16px' _placeholder={{ fontWeight: 400 }} resize='none' />}
      {!textArea && <ChakraInput value={value} defaultValue={defaultValue} textAlign={textAlign} isInvalid={errorMessage} onChange={e => onChange(e)} type={type} name={name} id={name} focusBorderColor='#e5ecea' className='input-box' placeholder={placeholder} fontWeight={400} _focus={{ fontWeight: 600 }} fontSize='16px' _placeholder={{ fontWeight: 400 }} />}
      {isShowErrorMessage && errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </Box>
  )
}

export default Input
