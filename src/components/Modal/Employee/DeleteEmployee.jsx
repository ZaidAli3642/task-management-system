import { ModalBody, ModalFooter, Text } from '@chakra-ui/react'

import Modal from '../Modal'
import { Button, Form, Input } from '../../Form'

const DeleteEmployee = ({ isOpen, onClose, onDeleteEmployee }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} modalHeading='Delete Employee'>
      <Form onSubmit={onDeleteEmployee}>
        <ModalBody>
          <Text fontWeight={400} fontSize='14px'>
            Are you sure you want to delete the employee?
          </Text>
          <Text fontWeight={400} fontSize='14px' marginTop={'5px'}>
            Their access to the platform will be removed.
          </Text>
        </ModalBody>
        <ModalFooter paddingX={'15px'} paddingTop={0}>
          <Button margin={'10px'} onClick={onClose} title='Cancel' size='small' color='grey' />
          <Button margin={'10px'} title='Delete' size='small' color='red' type='submit' />
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default DeleteEmployee
