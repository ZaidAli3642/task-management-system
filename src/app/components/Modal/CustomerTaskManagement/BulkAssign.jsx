import { ModalBody, ModalFooter, Box, Text } from '@chakra-ui/react'

import Modal from '../Modal'
import { Button, Form, Input, Switch } from '../../Form'
import SelectBox from '../../SelectBox'
import Badge from '../../Badge'
import RepeatWeekly from '../../Collapsibles/RepeatWeekly'
import { useState } from 'react'
import RepeatMonthly from '../../Collapsibles/RepeatMonthly'
import RepeatYearly from '../../Collapsibles/RepeatYearly'

const BulkAssign = ({ isOpen, onClose, onAddBulkAssign, onChangeInput, showDeleteModal, errorMessage, isInvalid }) => {
  const [isOpenWeekly, setIsOpenWeekly] = useState(false)
  const [isOpenMonthly, setIsOpenMonthly] = useState(false)
  const [isOpenYearly, setIsOpenYearly] = useState(false)

  const toggleWeekly = e => {
    setIsOpenWeekly(e.target.checked)
    setIsOpenMonthly(false)
    setIsOpenYearly(false)
  }
  const toggleMonthly = e => {
    setIsOpenWeekly(false)
    setIsOpenMonthly(e.target.checked)
    setIsOpenYearly(false)
  }
  const toggleYearly = e => {
    setIsOpenWeekly(false)
    setIsOpenMonthly(false)
    setIsOpenYearly(e.target.checked)
  }

  return (
    <Box maxHeight='708px'>
      <Modal minW={'fit-content'} isOpen={isOpen} onClose={onClose} modalHeading='Bulk assign' subHeading='Finance' subTitleFontWeight={700}>
        <Form onSubmit={onAddBulkAssign} isInvalid={isInvalid}>
          <ModalBody paddingY={0}>
            <Badge label={'Responsible'} marginTop='15px' />
            <SelectBox minW='100%' width='full' label={'Responsible'} selectedOption={null} />
            <Badge label={'Repetition'} marginTop='15px' />
            <RepeatWeekly toggleWeekly={toggleWeekly} isOpenWeekly={isOpenWeekly} />
            <RepeatMonthly toggleMonthly={toggleMonthly} isOpenMonthly={isOpenMonthly} />
            <RepeatYearly toggleYearly={toggleYearly} isOpenYearly={isOpenYearly} />
            <Badge label={'Note'} mt='20px' />

            <Input textArea errorMessage={'errorMessage.code'} onChange={onChangeInput} label='Note' name='note' placeholder='Enter note' marginX={0} />
          </ModalBody>
          <ModalFooter paddingX={'15px'} paddingBottom='10px' paddingTop={0}>
            <Button margin={'10px'} onClick={onClose} title='Cancel' size='small' color='grey' />
            <Button margin={'10px'} title='Add' size='small' color='green' type='submit' />
          </ModalFooter>
        </Form>
      </Modal>
    </Box>
  )
}

export default BulkAssign
