import { ChevronDownIcon } from '@chakra-ui/icons'
import { Box, Text } from '@chakra-ui/react'
import colors from '../config/colors'
import { useState } from 'react'

const DropDown = ({ data, onSelectItem, label, optionKey }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Box marginX={'10px'} position={'relative'}>
        <Box onClick={handleToggle} display={'flex'} cursor={'pointer'} justifyContent={'center'} width={'fit-content'} alignItems={'center'} flexWrap={'wrap'} backgroundColor={colors.darkGreen} padding={'10px'} paddingLeft={'15px'} borderRadius={'full'}>
          <Text color={colors.white} fontSize={'16px'} fontWeight={600}>
            {label}
          </Text>
          <ChevronDownIcon boxSize={6} color={colors.white} marginLeft={'5px'} />
        </Box>
        {isOpen && (
          <Box position={'absolute'} zIndex={99} border={1} backgroundColor={colors.white} borderColor={colors.borderGrey} borderStyle={'solid'} marginTop={'10px'} borderRadius={'10px'} padding={'10px'} paddingRight={'15px'} boxShadow={'0px 5px 25px 0px rgba(4, 38, 28, 0.05)'}>
            <Box
              w={'170px'}
              maxH={'250px'}
              overflowY={'scroll'}
              backgroundColor={colors.white}
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
            >
              {data.map(d => (
                <Box
                  key={d.id}
                  onClick={() => {
                    onSelectItem(d)
                    setIsOpen(false)
                  }}
                  cursor={'pointer'}
                >
                  <Text margin={'15px'} fontSize={'14px'} fontWeight={400}>
                    {d[optionKey]}
                  </Text>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </>
  )
}

export default DropDown
