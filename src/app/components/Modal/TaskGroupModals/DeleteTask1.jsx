import { ModalBody, ModalFooter, Text } from '@chakra-ui/react'

import Modal from '../Modal'
import { Button, Form } from '../../Form'

const DeleteTask1 = ({ isOpen, onClose, onDeleteEmployee }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} modalHeading='Delete task' employeeName='Capital budgeting'>
      <Form onSubmit={onDeleteEmployee}>
        <ModalBody>
          <Text fontWeight={400} fontSize='14px' color='black'>
            Are you sure you want to delete this task?
          </Text>
          
        </ModalBody>
        <ModalFooter paddingX={'15px'} paddingBottom='10px' paddingTop={0}>
          <Button margin={'10px'} onClick={onClose} title='Cancel' size='small' color='grey' />
          <Button margin={'10px'} title='Delete' size='small' color='red' type='submit' />
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default DeleteTask1
