import { ModalBody, ModalFooter } from '@chakra-ui/react'

import Modal from '../Modal'
import { Button, Form, Input } from '../../Form'

const EditCustomer = ({ isOpen, onClose, onEditEmployee, onChangeInput, errorMessage, isInvalid, showDeleteModal }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} modalHeading='Edit Customer'>
      <Form onSubmit={onEditEmployee} isInvalid={isInvalid}>
        <ModalBody paddingBottom={0}>
          <Input errorMessage={errorMessage.firstname} onChange={onChangeInput} inputArea='small' label='name' name='firstname' placeholder='' marginX={0} />
          <Input errorMessage={errorMessage.lastname} onChange={onChangeInput} inputArea='large' label='General Description' name='lastname' placeholder='' marginX={0} />
          <Input errorMessage={errorMessage.username} onChange={onChangeInput} inputArea='large' label='Codes' name='username' placeholder='' marginX={0} />
          {/* <Button onClick={showDeleteModal} title='Delete Customer' size='large' color='default' /> */}
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
