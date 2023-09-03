import { Box, Text } from '@chakra-ui/react'
import colors from '../config/colors'
import { useState } from 'react'
import assets from '../assets/assets'
import Icon from './Icon'
import CheckBox from './Form/Checkbox'

const Filter = ({ selectYear, selectedYear, data, onSelectItem, label, optionKey, dropDownContainerWidth, right, left, top, bottom, filterCheck, isClosable }) => {
  const [isOpen, setIsOpen] = useState(false)

  const setLabel = () => {
    const labelData = data?.filter(data => {
      if (filterCheck?.includes(data.id)) {
        return data
      }
    })

    if (!labelData?.length) return null

    return labelData?.length > 1 ? `${labelData[0][optionKey]} +${labelData.length - 1}` : `${labelData[0][optionKey]}`
  }

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Box marginX={'10px'} position={'relative'}>
        <Box onClick={handleToggle} display={'flex'} cursor={'pointer'} justifyContent={'center'} width={'fit-content'} alignItems={'center'}>
          <Text color={colors.black} fontSize={'14px'} textColor={colors.darkGreen} fontWeight={600}>
            {setLabel() || label}
          </Text>
          <Icon display='flex' justifyContent='center' alignItems='center' image={isOpen ? assets.icons.chevronUpGreen : assets.icons.chevronDownGreen} />
        </Box>
        {isOpen && (
          <Box position={'absolute'} left={left} right={right} top={top} bottom={bottom} w={dropDownContainerWidth} zIndex={999} border={1} backgroundColor={colors.white} borderColor={colors.borderGrey} borderStyle={'solid'} marginTop={'15px'} borderRadius={'10px'} padding={'10px'} paddingRight={'15px'} boxShadow={'0px 5px 25px 0px rgba(4, 38, 28, 0.05)'}>
            {selectedYear && (
              <Box paddingY={'5px'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Icon onClick={() => selectYear(+selectedYear - 1)} image={assets.icons.chevronLeftGreen} display='flex' justifyContent='center' cursor='pointer' alignItems='center' />
                <Text fontWeight={600} fontSize={'14px'} color={colors.black}>
                  {selectedYear}
                </Text>
                <Icon onClick={() => selectYear(+selectedYear + 1)} image={assets.icons.chevronRightGreen} display='flex' justifyContent='center' cursor='pointer' alignItems='center' />
              </Box>
            )}

            <Box
              w={'100%'}
              maxH={'250px'}
              overflowY={'auto'}
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
                    isClosable && onSelectItem(d)
                    isClosable && setIsOpen(false)
                  }}
                  display={'flex'}
                  justifyContent={'flex-start'}
                  alignItems={'center'}
                >
                  <CheckBox onChange={checked => onSelectItem(checked, d)} checked={filterCheck?.includes(d.id)} />
                  <Text margin={'5px'} fontSize={'14px'} fontWeight={400}>
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

export default Filter
