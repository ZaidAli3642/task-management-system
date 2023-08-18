import { ModalBody, ModalFooter,Text } from '@chakra-ui/react'
import colors from '../../../config/colors'
import {Menu,MenuButton,MenuList,MenuItem,MenuItemOption,MenuGroup,MenuOptionGroup,Box,MenuDivider,} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import Modal from '../Modal'
import { Button, Form, Input } from '../../Form'

const EditTaskModal = ({ isOpen, onClose, onAddCustomer, onChangeInput, errorMessage, isInvalid }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} modalHeading='Edit responsible' employeeName='Capital budgeting'>
      <Form onSubmit={onAddCustomer} isInvalid={isInvalid}>
        <ModalBody paddingY={0}>

        <Menu>
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
</Menu>
        <Button title='Remove responsible' size='large' color='default' />
        </ModalBody>
        <ModalFooter paddingX={'15px'} paddingBottom='10px' paddingTop={0}>
          <Button margin={'10px'} onClick={onClose} title='Cancel' size='small' color='grey' />
          <Button margin={'10px'} title='Save' size='small' color='green' type='submit' />
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default EditTaskModal
