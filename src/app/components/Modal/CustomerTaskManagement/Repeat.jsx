import { useEffect, useState } from 'react'
import { ModalBody, ModalFooter } from '@chakra-ui/react'
import { Button, Form } from '../../Form'
import Modal from '../Modal'
import RepeatMonthly from '../../Collapsibles/RepeatMonthly'
import RepeatWeekly from '../../Collapsibles/RepeatWeekly'
import RepeatYearly from '../../Collapsibles/RepeatYearly'

const Repeat = ({ isLoading, radioCheckedYearly, repetitionType, radioCheckedMonthly, subHeading, inputFieldsYearly, onChangeYearly, setYearlyRadio, yearlyRadio, monthlyRadio, isOpen, onClose, onSaveRepetition, errorMessagesWeekly, onChangeWeekly, onChangeMonthly, isInvalid, inputFieldsWeekly, errorMessagesMonthly, inputFieldsMonthly, setMonthlyRadio, setRepetitionType }) => {
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
    setIsOpenMonthly(e.target.checked)
    setIsOpenYearly(false)
    setIsOpenWeekly(false)
  }

  const toggleYearly = e => {
    setRepetitionType(e.target.checked && 'yearly')
    setIsOpenYearly(e.target.checked)
    setIsOpenWeekly(false)
    setIsOpenMonthly(false)
  }

  const closeRepetitionOptions = () => {
    setRepetitionType(null)
  }

  useEffect(() => {
    if (!repetitionType) {
      setIsOpenMonthly(false)
      setIsOpenWeekly(false)
      setIsOpenYearly(false)
    }
  }, [repetitionType])

  return (
    <Modal minW={'fit-content'} isOpen={isOpen} onClose={onClose} modalHeading='Repeat' subHeading={subHeading}>
      <Form onSubmit={onSaveRepetition} isInvalid={isInvalid}>
        <ModalBody w={isOpenYearly ? '100%' : '490px'} paddingY={0}>
          {/* Weekly */}
          <RepeatWeekly inputFieldsWeekly={inputFieldsWeekly} onChange={onChangeWeekly} errorMessage={errorMessagesWeekly} toggleWeekly={toggleWeekly} isOpenWeekly={isOpenWeekly} />
          {/* Monthly */}
          <RepeatMonthly radioChecked={radioCheckedMonthly} monthlyRadio={monthlyRadio} setMonthlyRadio={setMonthlyRadio} onChange={onChangeMonthly} inputFieldsMonthly={inputFieldsMonthly} errorMessage={errorMessagesMonthly} isOpenMonthly={isOpenMonthly} toggleMonthly={toggleMonthly} />
          {/* Yearly */}
          <RepeatYearly isShowBorderBottom={false} radioChecked={radioCheckedYearly} inputFieldsYearly={inputFieldsYearly} onChangeYearly={onChangeYearly} yearlyRadio={yearlyRadio} setYearlyRadio={setYearlyRadio} toggleYearly={toggleYearly} isOpenYearly={isOpenYearly} />
        </ModalBody>
        <ModalFooter paddingX={'15px'} paddingBottom='10px' paddingTop={0}>
          <Button
            margin={'10px'}
            onClick={() => {
              onClose()
              closeRepetitionOptions()
            }}
            title='Cancel'
            size='large'
            color='grey'
          />
          <Button isLoading={isLoading} margin={'10px'} title='Save' size='large' color='green' type='submit' />
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default Repeat
