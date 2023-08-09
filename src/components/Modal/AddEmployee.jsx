import { ModalBody, ModalFooter } from '@chakra-ui/react'

import Modal from './Modal'
import { Button, Form, Input } from '../Form'

const AddEmployee = ({ isOpen, onClose, onAddEmployee, onChangeInput, errorMessage, isInvalid }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} modalHeading='Add Employee'>
      <Form onSubmit={onAddEmployee} isInvalid={isInvalid}>
        <ModalBody>
          <Input errorMessage={errorMessage.firstname} onChange={onChangeInput} label='First Name' name='firstname' placeholder='Enter first name' marginX={0} />
          <Input errorMessage={errorMessage.lastname} onChange={onChangeInput} label='Last Name' name='lastname' placeholder='Enter last name' marginX={0} />
          <Input errorMessage={errorMessage.username} onChange={onChangeInput} label='Username' name='username' placeholder='Enter username' marginX={0} />
          <Input errorMessage={errorMessage.password} onChange={onChangeInput} label='Password' name='password' placeholder='Enter Password' marginX={0} type='password' />
          <Input errorMessage={errorMessage.confirmPassword} onChange={onChangeInput} label='Confirm Password' name='confirmPassword' placeholder='Re-enter password' marginX={0} type='password' />
        </ModalBody>
        <ModalFooter paddingX={'15px'} paddingTop={0}>
          <Button onClick={onClose} title='Cancel' size='small' color='grey' />
          <Button title='Add' size='small' color='green' type='submit' />
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default AddEmployee
