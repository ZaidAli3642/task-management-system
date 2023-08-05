import { Box, Select as ChakraSelect } from '@chakra-ui/react'

const Select = ({ name, label, options = [1, 2, 3] }) => {
  return (
    <Box className='input-container'>
      <label className='input-label' htmlFor={name}>
        {label}
      </label>
      <ChakraSelect placeholder='Select option' className='input-box' w={450}>
        {options.map(value => (
          <option value={value}>{value}</option>
        ))}
      </ChakraSelect>
    </Box>
  )
}

export default Select
