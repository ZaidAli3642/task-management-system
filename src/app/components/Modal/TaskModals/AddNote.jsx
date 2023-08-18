import { ModalBody, ModalFooter } from '@chakra-ui/react'

import Modal from '../Modal'
import { Button, Form, Input } from '../../Form'

const AddNote = ({ isOpen, onClose, onEditCustomer, onChangeInput, errorMessage, isInvalid }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} modalHeading='Add note' employeeName='Capital budgeting'>
      <Form onSubmit={onEditCustomer} isInvalid={isInvalid}>
        <ModalBody paddingY={0}>
          <Input textArea errorMessage={errorMessage.note} onChange={onChangeInput} label='Note' name='note' placeholder='Enter notes' marginX={0} />
        </ModalBody>
        <ModalFooter paddingX={'15px'} paddingBottom='10px' paddingTop={0}>
          <Button margin={'10px'} onClick={onClose} title='Cancel' size='small' color='grey' />
          <Button margin={'10px'} title='Add' size='small' color='green' type='submit' />
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default AddNote
