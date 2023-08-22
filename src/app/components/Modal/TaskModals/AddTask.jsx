import { ModalBody, ModalFooter,Text,Spacer, color } from '@chakra-ui/react'
import colors from '../../../config/colors'
import {Menu,MenuButton,MenuList,MenuItem,MenuItemOption,MenuGroup,MenuOptionGroup,Box,MenuDivider,} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import Modal from '../Modal'
import { Button, Form, Input } from '../../Form'
import SelectBox from './SelectBox'
import { useState } from 'react'

const AddTask = ({ isOpen, onClose, onAddCustomer, onChangeInput, errorMessage, isInvalid }) => {
  const [selectedItem, setSelectedItem] = useState(); // Initial label

  const handleMenuItemSelect = (item) => {
    setSelectedItem(item);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} modalHeading='Add responsible' employeeName='Capital budgeting'>
      <Form onSubmit={onAddCustomer} isInvalid={isInvalid}>
        <ModalBody paddingY={0}>
        
        <Menu>
        <Text fontWeight={500} color='black' fontSize={'12px'} mt={'10px'}>Responsible</Text>
        <MenuButton
        borderRadius='5px'
        border={'1px'}
        h={'50px'}
        w={'400px'}
        display='flex' borderColor={colors.borderGrey}
          color={selectedItem ? 'black' : 'grey'}
          float='left'
          
        >
          {selectedItem || 'Select'}{' '} <ChevronDownIcon float={'right'}  boxSize={6} color={'black'} me={'15px'} ms={'280px'}   />
        </MenuButton>
        
        <MenuList w={'450px'} h={'155px'}>
          <MenuItem onClick={() => handleMenuItemSelect('Joe')}>Joe</MenuItem>
          <MenuItem onClick={() => handleMenuItemSelect('Marco')}>Marco</MenuItem>
          <MenuItem onClick={() => handleMenuItemSelect('Franco')}>Franco</MenuItem>
          <MenuItem onClick={() => handleMenuItemSelect('Customer')}>Customer</MenuItem>
        </MenuList>
      </Menu>

        {/* <Menu>
            <Text fontWeight={500} fontSize={'12px'} mt={'10px'}>Responsible</Text>
            <MenuButton borderColor={colors.borderGrey} color={colors.greyGreen} display='flex' borderRadius='5px' border={'1px'} h={'50px'} w={'400px'}  >
              Select <ChevronDownIcon boxSize={6}  color={'black'}  ms={'300px'} />
            </MenuButton>
            
            
      <MenuList w={'450px'} h={'155px'} >
    <MenuItem>Joe</MenuItem>
    <MenuItem>Marco</MenuItem>
    <MenuItem>Franco</MenuItem>
    <MenuItem>Customer</MenuItem>
   
  </MenuList>
</Menu> */}
        </ModalBody>
        <ModalFooter paddingX={'15px'} paddingBottom='10px' paddingTop={0}>
          <Button margin={'10px'} onClick={onClose} title='Cancel' size='small' color='grey' />
          <Button margin={'10px'} title='Add' size='small' color='green' type='submit' />
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default AddTask
