import { ModalBody, ModalFooter,Text,Box,Switch,Stack,Checkbox,Divider } from '@chakra-ui/react'
import colors from '../../../config/colors'
import Modal from '../Modal'
import { Button, Form, Input } from '../../Form'

const EditRepeatModal = ({ isOpen, onClose, onEditCustomer, onChangeInput, errorMessage, isInvalid }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} modalHeading='Edit repeat' employeeName='Capital budgeting'>
      <Form onSubmit={onEditCustomer} isInvalid={isInvalid}>
        <ModalBody paddingY={0}>
          <Box mt={'10px'} display="flex" alignItems="center" justifyContent={'space-between'}>
            <Text color='black' fontSize={'16px'} fontWeight={600}  mr={2}>Weekly</Text>
              <Switch  size="md" colorScheme='green' />
          </Box>
          <Box fontSize='14px' color='black' display="inline-flex" fontWeight={500}  alignItems='center' gap='14px'>
            Repeat every
            <Box  border='1px' borderColor={colors.borderGrey} borderRadius='5px' display={'flex'}  padding='10px' w='50px' justifyContent='center'>
                1
            </Box>
            weeks
          </Box>
          <Box >
            <Text fontSize={'14px'} mt='15px' color='black' fontWeight={500} >Specify repeat days</Text>
          <Stack  mt='10px' w={'426px'} spacing={5} fontWeight={500} color={'black'}   direction='row' flexWrap='wrap'>
          <Checkbox  size={'md'}   colorScheme='green'  >
               <Text fontSize={'14px'}>Monday</Text>
            </Checkbox>
            <Checkbox borderTopRadius={'10px'} size={'md'} colorScheme='green' >
            <Text fontSize={'14px'}>Tuesday</Text>  
            </Checkbox>
            <Checkbox size={'md'} colorScheme='green' >
                <Text fontSize={'14px'}>Wednesday</Text>    
            </Checkbox>
            <Checkbox size={'md'} colorScheme='green' >
                <Text fontSize={'14px'}>Thursday</Text>  
            </Checkbox>
            <Checkbox size={'md'} colorScheme='green'>
                <Text fontSize={'14px'}>Friday</Text> 
            </Checkbox>
            <Checkbox size={'md'} colorScheme='green' >
                <Text fontSize={'14px'}> Saturday</Text>
            </Checkbox>
            <Checkbox size={'md'} colorScheme='green' >
               <Text fontSize={'14px'}>Sunday</Text> 
            </Checkbox>
            </Stack>
            </Box>
            <Divider mt='15px' />
            <Box mt={'10px'} display="flex" alignItems="center" justifyContent={'space-between'}>
            <Text color='black' fontSize={'16px'} fontWeight={600}  mr={2}>Monthly</Text>
              <Switch  size="md" colorScheme='green' />
          </Box>
          <Box mt={'20px'} display="flex" alignItems="center" justifyContent={'space-between'}>
            <Text color='black' fontSize={'16px'} fontWeight={600}  mr={2}>Yearly</Text>
              <Switch  size="md" colorScheme='green' />
          </Box>
        </ModalBody>
        <ModalFooter paddingX={'15px'} paddingBottom='10px' paddingTop={0}>
          <Button margin={'10px'} onClick={onClose} title='Cancel' size='small' color='grey' />
          <Button margin={'10px'} title='Save' size='small' color='green' type='submit' />
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default EditRepeatModal
