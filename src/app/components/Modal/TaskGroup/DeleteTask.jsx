import { ModalBody, ModalFooter, Text } from '@chakra-ui/react'

import Modal from '../Modal'
import { Button, Form } from '../../Form'

const DeleteTask = ({ isOpen, onClose, onDeleteTask, taskName }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} modalHeading='Delete task' subHeading={taskName}>
      <Form onSubmit={onDeleteTask}>
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

export default DeleteTask
