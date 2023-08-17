import { ModalBody, ModalFooter, Box,Text , Switch } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import Modal from '../Modal'
import colors from '../../../config/colors'
import { Button, Form, Input } from '../../Form'


const BulkAssign = ({ isOpen, onClose, onAddCustomer, onChangeInput, showDeleteModal, errorMessage, isInvalid }) => {
  return (
    <Box maxHeight='708px'>
    <Modal  isOpen={isOpen} onClose={onClose} modalHeading='Bulk assign' employeeName='Finance'>
      <Form   onSubmit={onAddCustomer} isInvalid={isInvalid}>
        <ModalBody paddingY={0}>
          <Box fontSize={'14px'} bg={colors.lightGreen} fontWeight={500} paddingTop='3px' border='1px'  borderColor={colors.mediumGreen} mt='15px' w='110px' h='30px' gap='10px' align='center' borderRadius='5px' > Responsible</Box>
          <Text mt='10px' fontSize='12px' fontWeight={500} >Responsible</Text>
          <Select placeholder='Select'>
                <option value='option1'>Option 1</option>
                <option value='option2'>Option 2</option>
                <option value='option3'>Option 3</option>
          </Select>
          <Box bg={colors.lightGreen} fontSize={'14px'} fontWeight={500} paddingTop='3px' border='1px' borderColor={colors.mediumGreen} mt='15px' w='97px' h='30px' gap='10px' align='center' borderRadius='5px' >Repetition</Box>
          <Box mt={'10px'} display="flex" alignItems="center" justifyContent={'space-between'}>
            <Text fontSize={'14px'} fontWeight={600}  mr={2}>Weekly</Text>
              <Switch  size="md" colorScheme='green' />
          </Box>
          <Box mt={'15px'} display="flex" alignItems="center" justifyContent={'space-between'}>
            <Text fontSize={'14px'} fontWeight={600} mr={2}>Monthly</Text>
              <Switch  size="md" colorScheme='green' />
          </Box>
          <Box mt={'15px'} display="flex" alignItems="center" justifyContent={'space-between'}>
            <Text fontSize={'14px'} fontWeight={600} mr={2}>Yearly</Text>
              <Switch  size="md" colorScheme='green' />
          </Box>
          <Box fontSize={'14px'} bg={colors.lightGreen} fontWeight={500} paddingTop='3px' border='1px'  borderColor={colors.mediumGreen} mt='20px' w='61px' h='30px' gap='10px' align='center' borderRadius='5px' >Note</Box>

          <Input  textArea errorMessage={errorMessage.code} onChange={onChangeInput} label='Note' name='note' placeholder='Enter note' marginX={0} />
         
        </ModalBody>
        <ModalFooter paddingX={'15px'} paddingBottom='10px' paddingTop={0}>
          <Button margin={'10px'} onClick={onClose} title='Cancel' size='small' color='grey' />
          <Button margin={'10px'} title='Add' size='small' color='green' type='submit' />
        </ModalFooter>
        
      </Form>
    </Modal>
    </Box>
  )
} 

export default BulkAssign
