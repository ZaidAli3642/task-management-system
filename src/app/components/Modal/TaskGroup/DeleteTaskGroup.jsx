import { ModalBody, ModalFooter, Text } from '@chakra-ui/react'

import Modal from '../Modal'
import { Button, Form } from '../../Form'

const DeleteTaskGroup = ({ isOpen, onClose, onDeleteTaskGroup, taskGroupName }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} modalHeading='Delete task group' employeeName={taskGroupName}>
      <Form onSubmit={onDeleteTaskGroup}>
        <ModalBody>
          <Text fontWeight={400} fontSize='14px' color='black'>
            Are you sure you want to delete this task group?
          </Text>
          <Text fontWeight={400} fontSize='14px' marginTop={'5px'} color='black'>
            All task within this group will also be removed.
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

export default DeleteTaskGroup
