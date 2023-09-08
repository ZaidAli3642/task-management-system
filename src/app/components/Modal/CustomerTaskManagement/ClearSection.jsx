import { ModalBody, ModalFooter, Text } from '@chakra-ui/react'

import Modal from '../Modal'
import { Button, Form } from '../../Form'

const ClearSection = ({ isLoading, isOpen, onClose, onClearSectionEmployee, subHeading }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} modalHeading='Clear Section' subHeading={subHeading}>
      <Form onSubmit={onClearSectionEmployee}>
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
          <Button isLoading={isLoading} margin={'10px'} title='Clear' size='small' color='red' type='submit' />
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default ClearSection
