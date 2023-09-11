import { Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import colors from '../config/colors'
import { useState } from 'react'
import assets from '../assets/assets'
import Icon from './Icon'
import CheckBox from './Form/Checkbox'

const Filter = ({ selectYear, selectedYear, data, onSelectItem, menuButtonMarginX = '6px', label, dropDownContainerWidth = '270px', optionKey, filterCheck }) => {
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

  const formatSelectedWeekText = data => {
    return (
      <Box marginTop={'1px'} marginX={'5px'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Text fontSize={'14px'} fontWeight={600}>
          {`Week ${data.week}`}&nbsp;
        </Text>
        <Text fontSize={'14px'} fontWeight={600}>
          {`.`}&nbsp;
        </Text>
        <Text fontSize={'14px'} fontWeight={400}>{`${data.weekFirstDate} to ${data.weekLastDate} ${selectedYear}`}</Text>
      </Box>
    )
  }

  return (
    <>
      <Menu isOpen={isOpen} closeOnSelect={false} onClose={() => setIsOpen(false)}>
        <MenuButton marginX={menuButtonMarginX} onClick={() => setIsOpen(!isOpen)}>
          <Flex alignItems={'center'}>
            <Text color={colors.black} fontSize={'14px'} textColor={colors.darkGreen} fontWeight={600}>
              {setLabel() || label}
            </Text>
            <Icon marginLeft='5px' marginBottom='1px' display='flex' justifyContent='center' alignItems='center' image={isOpen ? assets.icons.chevronUpGreen : assets.icons.chevronDownGreen} />
          </Flex>
        </MenuButton>
        <MenuList zIndex={99} position={'absolute'} top={'5px'} left={'-10px'} background={'white'} minW={dropDownContainerWidth} padding={'10px'} paddingLeft={0} margin={0}>
          <MenuList
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
            boxShadow={'0px 0px 0px 0px '}
            border={0}
            outline={0}
            background={'transparent'}
            padding={'0'}
            w={'auto'}
            maxH={'250px'}
            overflowY={'auto'}
          >
            {selectedYear && (
              <Box paddingY={'5px'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Icon onClick={() => selectYear(+selectedYear - 1)} image={assets.icons.chevronLeftGreen} display='flex' justifyContent='center' cursor='pointer' alignItems='center' />
                <Text fontWeight={600} fontSize={'14px'} color={colors.black}>
                  {selectedYear}
                </Text>
                <Icon onClick={() => selectYear(+selectedYear + 1)} image={assets.icons.chevronRightGreen} display='flex' justifyContent='center' cursor='pointer' alignItems='center' />
              </Box>
            )}
            {data.map((d, index) => (
              <MenuItem key={index} paddingY={'5px'} marginY={'5px'} fontSize={'14px'} fontWeight={400} display={'flex'} justifyContent={'flex-start'} alignItems={'center'} background={'transparent'}>
                <CheckBox
                  onChange={checked => {
                    onSelectItem(checked, d)
                  }}
                  checked={filterCheck?.includes(d.id)}
                />
                {selectYear ? (
                  formatSelectedWeekText(d)
                ) : (
                  <Text marginX={'5px'} marginTop={'1px'} lineHeight={0} fontSize={'14px'} fontWeight={400}>
                    {d[optionKey]}
                  </Text>
                )}
              </MenuItem>
            ))}
          </MenuList>
        </MenuList>
      </Menu>
    </>
  )
}

export default Filter
