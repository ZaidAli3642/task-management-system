import { ModalBody, ModalFooter } from '@chakra-ui/react'

import Modal from '../Modal'
import { Button, Form, Input } from '../../Form'

const AddTaskGroup = ({ isOpen, onClose, onAddTaskGroup, onChangeInput, errorMessages, isInvalid }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} modalHeading='Add task group'>
      <Form onSubmit={onAddTaskGroup} isInvalid={isInvalid}>
        <ModalBody paddingY={0}>
          <Input errorMessage={errorMessages.name} onChange={onChangeInput} label='Task group' name='name' placeholder='Enter name' marginX={0} />
        </ModalBody>
        <ModalFooter paddingX={'15px'} paddingBottom='10px' paddingTop={0}>
          <Button margin={'10px'} onClick={onClose} title='Cancel' size='small' color='grey' />
          <Button margin={'10px'} title='Add' size='small' color='green' type='submit' />
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default AddTaskGroup
