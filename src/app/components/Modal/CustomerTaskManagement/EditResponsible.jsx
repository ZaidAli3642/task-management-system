import { ModalBody, ModalFooter } from '@chakra-ui/react'
import { Button, Form } from '../../Form'
import Modal from '../Modal'
import SelectBox from '../../SelectBox'

const EditResponsible = ({ isOpen, onClose, onEditTask, errorMessage, isInvalid, showOption, options, selectedOption, onSelect }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} modalHeading='Edit responsible' subHeading={'Capital budgeting'}>
      <Form onSubmit={onEditTask} isInvalid={isInvalid}>
        <ModalBody paddingY={0}>
          <SelectBox errorMessage={'errorMessage.id'} showOption={showOption} width='400px' h='500px' label='Responsible' options={options} selectedOption={null} onSelect={onSelect} />
          <Button title={'Remove responsible'} color='default' size='large' />
        </ModalBody>
        <ModalFooter paddingX={'15px'} paddingBottom='10px' paddingTop={0}>
          <Button margin={'10px'} onClick={onClose} title='Cancel' size='small' color='grey' />
          <Button margin={'10px'} title='Save' size='small' color='green' type='submit' />
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default EditResponsible
