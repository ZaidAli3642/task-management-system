import { ModalBody, ModalFooter } from '@chakra-ui/react'

import Modal from '../Modal'
import { Button, Form, Input } from '../../Form'

const AddCustomer = ({ isOpen, onClose, onAddEmployee, onChangeInput, errorMessage, isInvalid }) => {
return (
    <Modal isOpen={isOpen} onClose={onClose} modalHeading='Add Customer'>
      <Form onSubmit={onAddEmployee} isInvalid={isInvalid}>
        <ModalBody>
          <Input errorMessage={errorMessage.firstname} onChange={onChangeInput} inputArea='small'  label='name' name='firstname' placeholder='Enter Customer name'  marginX={0}/>
          <Input errorMessage={errorMessage.lastname} onChange={onChangeInput} inputArea='large' label='General Description (optional)' name='lastname' placeholder='Enter description' marginX={0} />
          <Input errorMessage={errorMessage.username} onChange={onChangeInput} inputArea='large' label='Codes (optional)' name='username' placeholder='Enter codes' marginX={0} />
        </ModalBody>
        <ModalFooter paddingX={'15px'} paddingBottom='10px' paddingTop={0}>
          <Button margin={'10px'} onClick={onClose} title='Cancel' size='small' color='grey' />
          <Button margin={'10px'} title='Add' size='small' color='green' type='submit' />
        </ModalFooter>
      </Form>
    </Modal>
)
}

export default AddCustomer
