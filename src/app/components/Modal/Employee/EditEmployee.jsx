import { ModalBody, ModalFooter } from '@chakra-ui/react'

import Modal from '../Modal'
import { Button, Form, Input } from '../../Form'

const EditEmployee = ({ isOpen, onClose, onEditEmployee, onChangeInput, errorMessage, isInvalid, showDeleteModal, inputEditFields }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} modalHeading='Edit employee'>
      <Form onSubmit={onEditEmployee} isInvalid={isInvalid}>
        <ModalBody paddingBottom={0}>
          <Input value={inputEditFields.firstname} errorMessage={errorMessage.firstname} onChange={onChangeInput} label='First name' name='firstname' placeholder='Enter first name' marginX={0} />
          <Input value={inputEditFields.lastname} errorMessage={errorMessage.lastname} onChange={onChangeInput} label='Last name' name='lastname' placeholder='Enter last name' marginX={0} />
          <Input value={inputEditFields.username} errorMessage={errorMessage.username} onChange={onChangeInput} label='Username' name='username' placeholder='Enter username' marginX={0} />
          <Input errorMessage={errorMessage.password} onChange={onChangeInput} label='Set new password' name='password' placeholder='Enter password' marginX={0} type='password' />
          <Input errorMessage={errorMessage.confirmPassword} onChange={onChangeInput} label='Confirm new password' name='confirmPassword' placeholder='Re-enter password' marginX={0} type='password' />
          <Button onClick={showDeleteModal} title='Delete employee' size='large' color='default' />
        </ModalBody>
        <ModalFooter paddingX={'15px'} paddingBottom='10px' paddingTop={0}>
          <Button margin='10px' onClick={onClose} title='Cancel' size='small' color='grey' />
          <Button margin='10px' title='Save' size='small' color='green' type='submit' />
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default EditEmployee
