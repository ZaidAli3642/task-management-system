import React, { useEffect, useState } from 'react'
import { Box, Button, Collapse, Flex, FormErrorMessage, Text } from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import colors from '../config/colors'

const SelectBox = ({ label, options = [], onSelect, width, selectedOption, showOption, isCloseOther, isRadioSelection = false, errorMessage, selectedRadio, placeholder = 'Select', marginX, isPositionRelative = true, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleOptions = () => {
    if (isRadioSelection) {
      if (!selectedRadio) setIsOpen(!isOpen)
    } else {
      setIsOpen(!isOpen)
    }
  }

  useEffect(() => {
    setIsOpen(false)
  }, [selectedRadio])

  return (
    <>
      <Box display='inline-block' className='input-container' position={isPositionRelative && 'relative'} marginX={marginX} {...props}>
        {label && (
          <label className='input-label' htmlFor={name}>
            {label}
          </label>
        )}
        <Button minW={width} h='50px' _focus={{ borderColor: !selectedRadio && colors.darkGreen }} onClick={toggleOptions} border={2} borderColor={colors.borderGrey} borderStyle={'solid'} variant='none' size='sm' fontSize={'16px'} fontWeight={400} color={selectedOption ? 'black' : '#BFD7CF;'}>
          <Flex justifyContent='space-between' alignItems='center' width='100%' fontWeight={400} fontSize='16px'>
            <Text fontWeight={400} fontSize={'16px'} color={selectedOption ? (selectedRadio ? colors.greyGreen : 'black') : '#bfd7cf'}>
              {selectedOption ? selectedOption : placeholder}
            </Text>
            {isOpen ? <ChevronUpIcon color={colors.black} boxSize={6} /> : <ChevronDownIcon color={colors.black} boxSize={6} />}
          </Flex>
        </Button>
        {isOpen && (
          <Box position={'absolute'} padding={'10px'} paddingLeft={'0px'} background={'white'} display={'block'} width={width} border={1} borderColor={colors.borderGrey} borderStyle={'solid'} zIndex={999} marginTop={'5px'} borderRadius={'10px'} boxShadow={'0px 5px 25px 0px rgba(4, 38, 28, 0.05)'}>
            <Box
              css={{
                '&::-webkit-scrollbar': {
                  width: '7px',
                  borderRadius: '10px',
                  background: colors.borderGrey,
                },
                '&::-webkit-scrollbar-track': {
                  width: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: colors.darkGreen,
                  borderRadius: '10px',
                },
              }}
              maxHeight={'150px'}
              backgroundColor={'white'}
              overflowY={'auto'}
              paddingTop={'5px'}
            >
              {options.map((option, index) => (
                <Box
                  key={index}
                  onClick={() => {
                    onSelect(option)
                    toggleOptions()
                  }}
                  cursor={'pointer'}
                  margin={'15px'}
                  marginTop={0}
                >
                  <Text fontWeight={400} fontSize={'14px'}>
                    {option[showOption]}
                  </Text>
                </Box>
              ))}
            </Box>
          </Box>
        )}
        {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
      </Box>
    </>
  )
}

export default SelectBox
