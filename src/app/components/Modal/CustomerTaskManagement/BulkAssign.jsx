import { ModalBody, ModalFooter, Box, Text } from '@chakra-ui/react'

import Modal from '../Modal'
import { Button, Form, Input, Switch } from '../../Form'
import SelectBox from '../../SelectBox'
import Badge from '../../Badge'
import RepeatWeekly from '../../Collapsibles/RepeatWeekly'
import { useEffect, useState } from 'react'
import RepeatMonthly from '../../Collapsibles/RepeatMonthly'
import RepeatYearly from '../../Collapsibles/RepeatYearly'
import colors from '../../../config/colors'

const BulkAssign = ({ isLoading, setRepetitionType, inputFieldsNote, repetitionType, repetitionWeeklyDays, inputFieldsYearly, onChangeYearly, yearlyRadio, setYearlyRadio, monthlyRadio, repetitionMonthlyDate, repetitionMonthlyWeekNo, repetitionMonthlyWeekDay, setRepetitionMonthlyDate, setRepetitionMonthlyWeekDay, setRepetitionMonthlyWeekNo, setMonthlyRadio, onChangeMonthly, inputFieldsMonthly, errorMessagesMonthly, inputFieldsWeekly, onChangeWeekly, errorMessagesWeekly, errorMessagesResponsible, responsibleOptions, selectedOptionResponsible, onSelectResponsible, onOpenClearSectionModal, clearSectionButtonEnabled, isOpen, onClose, onAddBulkAssign, onChangeNoteInput, errorMessagesNote, subHeading, isInvalid }) => {
  const [isOpenWeekly, setIsOpenWeekly] = useState(false)
  const [isOpenMonthly, setIsOpenMonthly] = useState(false)
  const [isOpenYearly, setIsOpenYearly] = useState(false)

  const toggleWeekly = e => {
    setRepetitionType(e.target.checked && 'weekly')
    setIsOpenWeekly(e.target.checked)
    setIsOpenMonthly(false)
    setIsOpenYearly(false)
  }
  const toggleMonthly = e => {
    setRepetitionType(e.target.checked && 'monthly')
    setIsOpenWeekly(false)
    setIsOpenMonthly(e.target.checked)
    setIsOpenYearly(false)
  }
  const toggleYearly = e => {
    setRepetitionType(e.target.checked && 'yearly')
    setIsOpenWeekly(false)
    setIsOpenMonthly(false)
    setIsOpenYearly(e.target.checked)
  }

  const closeRepetitionOptions = () => {
    setRepetitionType(null)
    onChangeNoteInput({ target: { name: 'note', value: '' } })
  }

  const closeModal = () => {
    onClose()
    closeRepetitionOptions()
  }

  useEffect(() => {
    setIsOpenWeekly(repetitionType === 'weekly' ? true : false)
    setIsOpenMonthly(repetitionType === 'monthly' ? true : false)
    setIsOpenYearly(repetitionType === 'yearly' ? true : false)
  }, [repetitionType])

  return (
    <Box maxHeight='708px'>
      <Modal minW={'fit-content'} isOpen={isOpen} onClose={closeModal} modalHeading='Bulk assign' subHeading={subHeading} subTitleFontWeight={700} contentPadding={'10px'} headerPadding={'10px'}>
        <Form onSubmit={onAddBulkAssign} isInvalid={isInvalid}>
          <ModalBody
            w={isOpenYearly ? '100%' : '490px'}
            paddingY={0}
            paddingX={'10px'}
            height={clearSectionButtonEnabled ? '650px' : '570px'}
            overflow={'auto'}
            css={{
              '&::-webkit-scrollbar': {
                width: '7px',
                borderRadius: '10px',
                background: colors.borderGrey,
              },
              '&::-webkit-scrollbar-track': {
                width: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: colors.darkGreen,
                borderRadius: '10px',
              },
            }}
          >
            <Badge label={'Responsible'} marginTop='15px' />
            <SelectBox errorMessage={errorMessagesResponsible?.responsibleId} showOption={'first_name'} options={responsibleOptions} onSelect={onSelectResponsible} selectedOption={selectedOptionResponsible} minW='100%' width='full' label={'Responsible'} />
            <Badge label={'Repetition'} marginTop='15px' />
            <RepeatWeekly repetitionWeeklyDays={repetitionWeeklyDays} inputFieldsWeekly={inputFieldsWeekly} onChange={onChangeWeekly} errorMessage={errorMessagesWeekly} toggleWeekly={toggleWeekly} isOpenWeekly={isOpenWeekly} />
            <RepeatMonthly radioChecked={monthlyRadio} monthlyRadio={monthlyRadio} repetitionMonthlyDate={repetitionMonthlyDate} repetitionMonthlyWeekNo={repetitionMonthlyWeekNo} repetitionMonthlyWeekDay={repetitionMonthlyWeekDay} setRepetitionMonthlyDate={setRepetitionMonthlyDate} setRepetitionMonthlyWeekDay={setRepetitionMonthlyWeekDay} setRepetitionMonthlyWeekNo={setRepetitionMonthlyWeekNo} setMonthlyRadio={setMonthlyRadio} onChange={onChangeMonthly} inputFieldsMonthly={inputFieldsMonthly} errorMessage={errorMessagesMonthly} isOpenMonthly={isOpenMonthly} toggleMonthly={toggleMonthly} />
            <RepeatYearly radioChecked={yearlyRadio} inputFieldsYearly={inputFieldsYearly} onChangeYearly={onChangeYearly} yearlyRadio={yearlyRadio} setYearlyRadio={setYearlyRadio} toggleYearly={toggleYearly} isOpenYearly={isOpenYearly} />
            <Badge label={'Note'} mt='20px' />

            <Input textArea value={inputFieldsNote?.note} errorMessage={errorMessagesNote?.note} onChange={onChangeNoteInput} label='Note' name='note' placeholder='Enter note' marginX={0} />
            {clearSectionButtonEnabled && <Button onClick={onOpenClearSectionModal} title='Clear all sections' color='default' size='large' />}
          </ModalBody>
          <ModalFooter padding={0} paddingBottom='10px' paddingTop={0}>
            <Button margin={'10px'} onClick={closeModal} title='Cancel' size='large' color='grey' />
            <Button isLoading={isLoading} margin={'10px'} title='Add' size='large' color='green' type='submit' />
          </ModalFooter>
        </Form>
      </Modal>
    </Box>
  )
}

export default BulkAssign
