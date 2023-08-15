import { ModalBody, ModalFooter } from '@chakra-ui/react'

import Modal from '../Modal'
import { Button, Form, Input } from '../../Form'

const AddCustomer = ({ isOpen, onClose, onAddCustomer, onChangeInput, errorMessage, isInvalid }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} modalHeading='Add customer'>
      <Form onSubmit={onAddCustomer} isInvalid={isInvalid}>
        <ModalBody paddingY={0}>
          <Input errorMessage={errorMessage.name} onChange={onChangeInput} label='Name' name='name' placeholder='Enter customer name' marginX={0} />
          <Input textArea errorMessage={errorMessage.description} onChange={onChangeInput} label='General description' sublabel='(optional)' name='description' placeholder='Enter description' marginX={0} />
          <Input textArea errorMessage={errorMessage.code} onChange={onChangeInput} label='Codes' sublabel='(optional)' name='code' placeholder='Enter codes' marginX={0} />
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
