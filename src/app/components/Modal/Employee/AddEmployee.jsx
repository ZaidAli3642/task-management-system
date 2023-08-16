import { ModalBody, ModalFooter } from '@chakra-ui/react'

import Modal from '../Modal'
import { Button, Form, Input } from '../../Form'

const AddEmployee = ({ isOpen, onClose, onAddEmployee, onChangeInput, errorMessage, isInvalid }) => {
return (
    <Modal isOpen={isOpen} onClose={onClose} modalHeading='Add Employee'>
      <Form onSubmit={onAddEmployee} isInvalid={isInvalid}>
        <ModalBody>
          <Input errorMessage={errorMessage.firstname} onChange={onChangeInput} inputArea='small' label='First name' name='firstname' placeholder='Enter first name' marginX={0} />
          <Input errorMessage={errorMessage.lastname} onChange={onChangeInput} inputArea='small' label='Last name' name='lastname' placeholder='Enter last name' marginX={0} />
          <Input errorMessage={errorMessage.username} onChange={onChangeInput} inputArea='small' label='Username' name='username' placeholder='Enter username' marginX={0} />
          <Input errorMessage={errorMessage.password} onChange={onChangeInput} inputArea='small' label='Password' name='password' placeholder='Enter password' marginX={0} type='password' />
          <Input errorMessage={errorMessage.confirmPassword} onChange={onChangeInput} inputArea='small' label='Confirm password' name='confirmPassword' placeholder='Re-enter password' marginX={0} type='password' />
        </ModalBody>
        <ModalFooter paddingX={'15px'} paddingBottom='10px' paddingTop={0}>
          <Button margin={'10px'} onClick={onClose} title='Cancel' size='small' color='grey' />
          <Button margin={'10px'} title='Add' size='small' color='green' type='submit' />
        </ModalFooter>
      </Form>
    </Modal>
)
}

export default AddEmployee
