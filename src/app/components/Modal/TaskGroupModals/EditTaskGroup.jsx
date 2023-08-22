import { ModalBody, ModalFooter,Text,Spacer, color } from '@chakra-ui/react'

import Modal from '../Modal'
import { Button, Form, Input } from '../../Form'

const EditTaskGroup = ({ isOpen, onClose, onAddCustomer, onChangeInput, errorMessage, isInvalid }) => {


  return (
    <Modal isOpen={isOpen} onClose={onClose} modalHeading='Edit task group' >
      <Form onSubmit={onAddCustomer} isInvalid={isInvalid}>
        <ModalBody paddingY={0}>
        <Input errorMessage={errorMessage.name} onChange={onChangeInput} label='Task group' name='name' placeholder='Enter  name' marginX={0} />
        <Button  title='Delete task group' size='large' color='default' />
        </ModalBody>
        <ModalFooter paddingX={'15px'} paddingBottom='10px' paddingTop={0}>
          <Button margin={'10px'} onClick={onClose} title='Cancel' size='small' color='grey' />
          <Button margin={'10px'} title='Save' size='small' color='green' type='submit' />
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default EditTaskGroup
