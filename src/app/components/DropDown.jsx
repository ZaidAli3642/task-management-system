import { ChevronDownIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import colors from '../config/colors'
import { useState } from 'react'

const DropDown = ({ data, onSelectItem, label, optionKey }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Menu isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <MenuButton onClick={() => setIsOpen(!isOpen)} ml='5px' padding={'10px'} paddingLeft={'15px'} borderRadius={'full'} as={Button} backgroundColor={colors.darkGreen} _hover={{ backgroundColor: colors.darkGreen }} _active={{ backgroundColor: colors.darkGreen }}>
          <Flex justifyContent={'center'} alignItems={'center'}>
            <Text color={colors.white} fontSize={'16px'} fontWeight={600}>
              {label}
            </Text>
            <ChevronDownIcon boxSize={6} color={colors.white} marginLeft={'5px'} />
          </Flex>
        </MenuButton>
        <MenuList zIndex={99} background={'white'} minW={'170px'} padding={'10px'} margin={0}>
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
            maxH={'250px'}
            minWidth={'170px'}
            overflowY={'auto'}
          >
            {data.map((d, index) => (
              <MenuItem
                marginBottom={index === data.length - 1 ? 0 : '15px'}
                key={d.id}
                onClick={() => {
                  onSelectItem(d)
                  setIsOpen(false)
                }}
                fontSize={'14px'}
                fontWeight={400}
                background={'transparent'}
              >
                {d[optionKey]}
              </MenuItem>
            ))}
          </MenuList>
        </MenuList>
      </Menu>
    </>
  )
}

export default DropDown
