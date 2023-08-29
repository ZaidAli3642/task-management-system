import { ModalBody, ModalFooter, Text } from '@chakra-ui/react'

import Modal from '../Modal'
import { Button, Form } from '../../Form'

const ClearSection = ({ isOpen, onClose, onDeleteEmployee, employee }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} modalHeading='Delete employee' subHeading={`${employee?.first_name} ${employee?.last_name}`}>
      <Form onSubmit={onDeleteEmployee}>
        <ModalBody>
          <Text fontWeight={400} fontSize='14px'>
            Are you sure you want to clear all sections in this group?
          </Text>
          <Text fontWeight={400} fontSize='14px' marginTop={'5px'}>
            All fields will be emptied
          </Text>
        </ModalBody>
        <ModalFooter paddingX={'15px'} paddingBottom='10px' paddingTop={0}>
          <Button margin={'10px'} onClick={onClose} title='Cancel' size='small' color='grey' />
          <Button margin={'10px'} title='Clear' size='small' color='red' type='submit' />
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default ClearSection
