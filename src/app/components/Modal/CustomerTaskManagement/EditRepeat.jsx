import { useEffect, useState } from 'react'
import { ModalBody, ModalFooter } from '@chakra-ui/react'
import { Button, Form } from '../../Form'
import Modal from '../Modal'
import RepeatMonthly from '../../Collapsibles/RepeatMonthly'
import RepeatWeekly from '../../Collapsibles/RepeatWeekly'
import RepeatYearly from '../../Collapsibles/RepeatYearly'

const EditRepeat = ({ radioCheckedYearly, radioCheckedMonthly, repetitionWeeklyDays, repetitionType, inputFieldsYearly, onChangeYearly, setYearlyRadio, yearlyRadio, monthlyRadio, isOpen, onClose, onSaveRepetition, errorMessagesWeekly, onChangeWeekly, onChangeMonthly, isInvalid, inputFieldsWeekly, errorMessagesMonthly, inputFieldsMonthly, setMonthlyRadio, setRepetitionType }) => {
  const [isOpenWeekly, setIsOpenWeekly] = useState(false)
  const [isOpenMonthly, setIsOpenMonthly] = useState(false)
  const [isOpenYearly, setIsOpenYearly] = useState()

  const toggleWeekly = e => {
    setRepetitionType('weekly')
    setIsOpenWeekly(e.target.checked)
    setIsOpenMonthly(false)
    setIsOpenYearly(false)
  }

  const toggleMonthly = e => {
    setRepetitionType('monthly')
    setIsOpenMonthly(e.target.checked)
    setIsOpenYearly(false)
    setIsOpenWeekly(false)
  }

  const toggleYearly = e => {
    setRepetitionType('yearly')
    setIsOpenYearly(e.target.checked)
    setIsOpenWeekly(false)
    setIsOpenMonthly(false)
  }

  useEffect(() => {
    setIsOpenWeekly(repetitionType === 'weekly' ? true : false)
    setIsOpenMonthly(repetitionType === 'monthly' ? true : false)
    setIsOpenYearly(repetitionType === 'yearly' ? true : false)
  }, [repetitionType])

  return (
    <Modal minW={'fit-content'} isOpen={isOpen} onClose={onClose} modalHeading='Edit repeat' subHeading={'Capital budgeting'}>
      <Form onSubmit={onSaveRepetition} isInvalid={isInvalid}>
        <ModalBody paddingY={0}>
          {/* Weekly */}
          <RepeatWeekly repetitionWeeklyDays={repetitionWeeklyDays} inputFieldsWeekly={inputFieldsWeekly} onChange={onChangeWeekly} errorMessage={errorMessagesWeekly} toggleWeekly={toggleWeekly} isOpenWeekly={isOpenWeekly} />
          {/* Monthly */}
          <RepeatMonthly radioChecked={radioCheckedMonthly} monthlyRadio={monthlyRadio} setMonthlyRadio={setMonthlyRadio} onChange={onChangeMonthly} inputFieldsMonthly={inputFieldsMonthly} errorMessage={errorMessagesMonthly} isOpenMonthly={isOpenMonthly} toggleMonthly={toggleMonthly} />
          {/* Yearly */}
          <RepeatYearly radioChecked={radioCheckedYearly} inputFieldsYearly={inputFieldsYearly} onChangeYearly={onChangeYearly} yearlyRadio={yearlyRadio} setYearlyRadio={setYearlyRadio} toggleYearly={toggleYearly} isOpenYearly={isOpenYearly} />
        </ModalBody>
        <ModalFooter paddingX={'15px'} paddingBottom='10px' paddingTop={0}>
          <Button margin={'10px'} onClick={onClose} title='Cancel' size='small' color='grey' />
          <Button margin={'10px'} title='Save' size='small' color='green' type='submit' />
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default EditRepeat
