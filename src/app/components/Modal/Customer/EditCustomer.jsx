import { ModalBody, ModalFooter } from '@chakra-ui/react'

import Modal from '../Modal'
import { Button, Form, Input } from '../../Form'

const EditCustomer = ({ isOpen, onClose, onEditEmployee, onChangeInput, errorMessage, isInvalid, showDeleteModal }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} modalHeading='Edit customer'>
      <Form onSubmit={onEditEmployee} isInvalid={isInvalid}>
        <ModalBody paddingBottom={0}>
          <Input errorMessage={errorMessage.firstname} onChange={onChangeInput} label=' Name' name='name' placeholder='Enter name' marginX={0} />
          <Input errorMessage={errorMessage.lastname} istextarea='textarea' onChange={onChangeInput} label='Gernal description' name='description' placeholder='Enter description' marginX={0} />
          <Input errorMessage={errorMessage.lastname} istextarea='textarea' onChange={onChangeInput} label='Codes' name='code' placeholder='Enter your code' marginX={0} />
        </ModalBody>
        <ModalFooter paddingX={'15px'} paddingBottom='10px' paddingTop={0}>
          <Button margin='10px' onClick={onClose} title='Cancel' size='small' color='grey' />
          <Button margin='10px' title='Save' size='small' color='green' type='submit' />
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default EditCustomer
