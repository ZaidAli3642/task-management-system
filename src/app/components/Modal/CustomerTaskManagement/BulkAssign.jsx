import { ModalBody, ModalFooter, Box, Text } from '@chakra-ui/react'

import Modal from '../Modal'
import { Button, Form, Input, Switch } from '../../Form'
import SelectBox from '../../SelectBox'
import Badge from '../../Badge'
import RepeatWeekly from '../../Collapsibles/RepeatWeekly'
import { useState } from 'react'
import RepeatMonthly from '../../Collapsibles/RepeatMonthly'
import RepeatYearly from '../../Collapsibles/RepeatYearly'

const BulkAssign = ({
  isLoading,
  setRepetitionType,
  inputFieldsYearly,
  onChangeYearly,
  yearlyRadio,
  setYearlyRadio,
  monthlyRadio,
  repetitionMonthlyDate,
  repetitionMonthlyWeekNo,
  repetitionMonthlyWeekDay,
  setRepetitionMonthlyDate,
  setRepetitionMonthlyWeekDay,
  setRepetitionMonthlyWeekNo,
  setMonthlyRadio,
  onChangeMonthly,
  inputFieldsMonthly,
  errorMessagesMonthly,
  inputFieldsWeekly,
  onChangeWeekly,
  errorMessagesWeekly,
  errorMessagesResponsible,
  responsibleOptions,
  selectedOptionResponsible,
  onSelectResponsible,
  onOpenClearSectionModal,
  clearSectionButtonEnabled,
  isOpen,
  onClose,
  onAddBulkAssign,
  onChangeNoteInput,
  errorMessagesNote,

  isInvalid,
}) => {
  const [isOpenWeekly, setIsOpenWeekly] = useState(false)
  const [isOpenMonthly, setIsOpenMonthly] = useState(false)
  const [isOpenYearly, setIsOpenYearly] = useState(false)

  const toggleWeekly = e => {
    setRepetitionType('weekly')
    setIsOpenWeekly(e.target.checked)
    setIsOpenMonthly(false)
    setIsOpenYearly(false)
  }
  const toggleMonthly = e => {
    setRepetitionType('monthly')
    setIsOpenWeekly(false)
    setIsOpenMonthly(e.target.checked)
    setIsOpenYearly(false)
  }
  const toggleYearly = e => {
    setRepetitionType('yearly')
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
            <SelectBox errorMessage={errorMessagesResponsible?.responsibleId} showOption={'first_name'} options={responsibleOptions} onSelect={onSelectResponsible} selectedOption={selectedOptionResponsible} minW='100%' width='full' label={'Responsible'} />
            <Badge label={'Repetition'} marginTop='15px' />
            <RepeatWeekly inputFieldsWeekly={inputFieldsWeekly} onChange={onChangeWeekly} errorMessage={errorMessagesWeekly} toggleWeekly={toggleWeekly} isOpenWeekly={isOpenWeekly} />
            <RepeatMonthly monthlyRadio={monthlyRadio} repetitionMonthlyDate={repetitionMonthlyDate} repetitionMonthlyWeekNo={repetitionMonthlyWeekNo} repetitionMonthlyWeekDay={repetitionMonthlyWeekDay} setRepetitionMonthlyDate={setRepetitionMonthlyDate} setRepetitionMonthlyWeekDay={setRepetitionMonthlyWeekDay} setRepetitionMonthlyWeekNo={setRepetitionMonthlyWeekNo} setMonthlyRadio={setMonthlyRadio} onChange={onChangeMonthly} inputFieldsMonthly={inputFieldsMonthly} errorMessage={errorMessagesMonthly} isOpenMonthly={isOpenMonthly} toggleMonthly={toggleMonthly} />
            <RepeatYearly inputFieldsYearly={inputFieldsYearly} onChangeYearly={onChangeYearly} yearlyRadio={yearlyRadio} setYearlyRadio={setYearlyRadio} toggleYearly={toggleYearly} isOpenYearly={isOpenYearly} />
            <Badge label={'Note'} mt='20px' />

            <Input textArea errorMessage={errorMessagesNote?.note} onChange={onChangeNoteInput} label='Note' name='note' placeholder='Enter note' marginX={0} />
            {clearSectionButtonEnabled && <Button onClick={onOpenClearSectionModal} title='Clear all sections' color='default' size='large' />}
          </ModalBody>
          <ModalFooter paddingX={'15px'} paddingBottom='10px' paddingTop={0}>
            <Button margin={'10px'} onClick={onClose} title='Cancel' size='large' color='grey' />
            <Button isLoading={isLoading} margin={'10px'} title='Add' size='large' color='green' type='submit' />
          </ModalFooter>
        </Form>
      </Modal>
    </Box>
  )
}

export default BulkAssign
