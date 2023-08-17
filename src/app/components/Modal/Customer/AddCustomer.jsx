import { ModalBody, ModalFooter } from '@chakra-ui/react'

import Modal from '../Modal'
import { Button, Form, Input } from '../../Form'


const AddCustomer = ({ isOpen, onClose, onAddCustomer, onChangeInput, errorMessage, isInvalid }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} modalHeading='Add customer'>
      <Form onSubmit={onAddCustomer} isInvalid={isInvalid}>
        <ModalBody>
          <Input errorMessage={errorMessage.firstname} onChange={onChangeInput} label='Name' name='firstname' placeholder='Enter Customer name' marginX={0} />
          <Input errorMessage={errorMessage.description} onChange={onChangeInput} istextarea={'textarea'} label='Gernal description (optional)' name='description' placeholder='Enter Description' marginX={0} />
          <Input errorMessage={errorMessage.code} onChange={onChangeInput} istextarea={'textarea'} label='Codes (optional)' name='code' placeholder='Enter Codes' marginX={0}   />
          
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
