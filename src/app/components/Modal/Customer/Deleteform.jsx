import { ModalBody, ModalFooter, Text } from '@chakra-ui/react'

import Modal from '../Modal'
import { Button, Form } from '../../Form'

const Deleteform = ({ isOpen, onClose, onDeleteEmployee }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} modalHeading='Clear selections' employeeName='Creditor'>
      <Form onSubmit={onDeleteEmployee}>
        <ModalBody>
          <Text fontWeight={400} fontSize='14px'>
            Are you sure you want to clear all selections in this group?
          </Text>
          <Text fontWeight={400} fontSize='14px' marginTop={'5px'}>
            All feilds will be emptied.
          </Text>
        </ModalBody>
        <ModalFooter paddingX={'15px'} paddingBottom='10px' paddingTop={0}>
          <Button margin={'10px'} onClick={onClose} title='Cancel' size='small' color='grey' />
          <Button margin={'10px'} title='Delete' size='small' color='red' type='submit' />
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default Deleteform
