import { ModalBody, ModalFooter } from '@chakra-ui/react'

import Modal from '../Modal'
import { Button, Form, Input } from '../../Form'

const EditCustomer = ({ isOpen, onClose, onEditCustomer, onChangeInput, errorMessage, isInvalid, inputFields }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} modalHeading='Edit customer'>
      <Form onSubmit={onEditCustomer} isInvalid={isInvalid}>
        <ModalBody paddingY={0}>
          <Input value={inputFields.name} errorMessage={errorMessage.name} onChange={onChangeInput} label='Name' name='name' placeholder='Enter customer name' marginX={0} />
          <Input value={inputFields.description || ''} textArea errorMessage={errorMessage.description} onChange={onChangeInput} label='General description' name='description' placeholder='Enter description' marginX={0} />
          <Input value={inputFields.code || ''} textArea errorMessage={errorMessage.code} onChange={onChangeInput} label='Codes' name='code' placeholder='Enter codes' marginX={0} />
        </ModalBody>
        <ModalFooter paddingX={'15px'} paddingBottom='10px' paddingTop={0}>
          <Button margin={'10px'} onClick={onClose} title='Cancel' size='small' color='grey' />
          <Button margin={'10px'} title='Save' size='small' color='green' type='submit' />
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default EditCustomer
