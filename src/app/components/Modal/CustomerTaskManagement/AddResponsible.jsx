import { ModalBody, ModalFooter } from '@chakra-ui/react'
import { Button, Form } from '../../Form'
import Modal from '../Modal'
import SelectBox from '../../SelectBox'

const AddResponsible = ({ isOpen, onClose, onAddResponsible, errorMessage, isInvalid, showOption, options, selectedOption, onSelect }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} modalHeading='Add responsible' subHeading={'Capital budgeting'}>
      <Form onSubmit={onAddResponsible} isInvalid={isInvalid}>
        <ModalBody paddingY={0}>
          <SelectBox errorMessage={errorMessage.id} showOption={showOption} width='full' w='100%' label='Responsible' options={options} selectedOption={selectedOption} onSelect={onSelect} />
        </ModalBody>
        <ModalFooter paddingX={'15px'} paddingBottom='10px' paddingTop={0}>
          <Button margin={'10px'} onClick={onClose} title='Cancel' size='small' color='grey' />
          <Button margin={'10px'} title='Add' size='small' color='green' type='submit' />
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default AddResponsible
