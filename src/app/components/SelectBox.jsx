import React, { useState } from 'react'
import { Box, Button, Collapse, Flex, FormErrorMessage, Text } from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import colors from '../config/colors'

const SelectBox = ({ label, options = [], onSelect, width, selectedOption, showOption, errorMessage, placeholder = 'Select', marginX, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleOptions = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Box display='inline-block' className='input-container' position={'relative'} marginX={marginX} {...props}>
        {label && (
          <label className='input-label' htmlFor={name}>
            {label}
          </label>
        )}
        <Button minW={width} h='50px' _focus={{ borderColor: colors.darkGreen }} onClick={toggleOptions} border={2} borderColor={colors.borderGrey} borderStyle={'solid'} variant='none' size='sm' fontSize={'16px'} fontWeight={400} color={selectedOption ? 'black' : '#BFD7CF;'}>
          <Flex justifyContent='space-between' alignItems='center' width='100%' fontWeight={400} fontSize='16px'>
            <Text fontWeight={400} fontSize={'16px'} color={selectedOption ? 'black' : '#bfd7cf'}>
              {selectedOption !== null ? selectedOption : placeholder}
            </Text>
            {isOpen ? <ChevronUpIcon color={colors.black} boxSize={6} /> : <ChevronDownIcon color={colors.black} boxSize={6} />}
          </Flex>
        </Button>
        {isOpen && (
          <Box position={'absolute'} display={'block'} boxShadow={'0px 5px 25px 0px rgba(4, 38, 28, 0.05)'} width={'100%'} marginTop={'5px'} borderRadius={'10px'} maxHeight={'150px'} backgroundColor={'white'} overflow={'scroll'} border={1} borderColor={colors.borderGrey} borderStyle={'solid'} zIndex={99}>
            {options.map(option => (
              <Box
                onClick={() => {
                  onSelect(option)
                  toggleOptions()
                }}
                cursor={'pointer'}
                margin={'15px'}
              >
                <Text fontWeight={400} fontSize={'14px'}>
                  {option[showOption]}
                </Text>
              </Box>
            ))}
          </Box>
        )}

        {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
      </Box>
    </>
  )
}

export default SelectBox
