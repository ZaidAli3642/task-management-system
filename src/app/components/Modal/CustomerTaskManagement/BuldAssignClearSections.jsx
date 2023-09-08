import { ModalBody, ModalFooter, Box, Text } from '@chakra-ui/react'

import Modal from '../Modal'
import { Button, Form, Input, Switch } from '../../Form'
import SelectBox from '../../SelectBox'
import Badge from '../../Badge'

const BulkAssignClearSections = ({ isLoading, isOpen, onClose, onAddBulkAssign, onChangeInput, showDeleteModal, errorMessage, isInvalid }) => {
  return (
    <Box maxHeight='708px'>
      <Modal isOpen={isOpen} onClose={onClose} modalHeading='Bulk assign' subHeading='Finance' subTitleFontWeight={700}>
        <Form onSubmit={onAddBulkAssign} isInvalid={isInvalid}>
          <ModalBody paddingY={0}>
            <Badge label={'Responsible'} marginTop='15px' />
            <SelectBox width='400px' h='500px' label={'Responsible'} selectedOption={null} />
            <Badge label={'Repetition'} marginTop='15px' />
            <Box mt={'10px'} display='flex' alignItems='center' justifyContent={'space-between'}>
              <Text fontSize={'16px'} fontWeight={600} mr={2}>
                Weekly
              </Text>
              <Switch size='md' />
            </Box>
            <Box mt={'15px'} display='flex' alignItems='center' justifyContent={'space-between'}>
              <Text fontSize={'16px'} fontWeight={600} mr={2}>
                Monthly
              </Text>
              <Switch size='md' />
            </Box>
            <Box mt={'15px'} display='flex' alignItems='center' justifyContent={'space-between'}>
              <Text fontSize={'16px'} fontWeight={600} mr={2}>
                Yearly
              </Text>
              <Switch size='md' />
            </Box>
            <Badge label={'Note'} mt='20px' />

            <Input textArea errorMessage={'errorMessage.code'} onChange={onChangeInput} label='Note' name='note' placeholder='Enter note' marginX={0} />
            <Button title='Clear all sections' color='default' size='large' />
          </ModalBody>
          <ModalFooter paddingX={'15px'} paddingBottom='10px' paddingTop={0}>
            <Button margin={'10px'} onClick={onClose} title='Cancel' size='small' color='grey' />
            <Button isLoading={isLoading} margin={'10px'} title='Add' size='small' color='green' type='submit' />
          </ModalFooter>
        </Form>
      </Modal>
    </Box>
  )
}

export default BulkAssignClearSections
