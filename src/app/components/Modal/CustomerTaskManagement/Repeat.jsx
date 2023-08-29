import { Box, ModalBody, ModalFooter, Text, Collapse } from '@chakra-ui/react'
import { Button, Form, Input, Switch } from '../../Form'
import Modal from '../Modal'
import { useState } from 'react'
import colors from '../../../config/colors'
import CheckBox from '../../Form/Checkbox'
import Radio from '../../Form/Radio'
import SelectBox from '../../SelectBox'
import RepeatMonthly from '../../Collapsibles/RepeatMonthly'
import RepeatWeekly from '../../Collapsibles/RepeatWeekly'
import RepeatYearly from '../../Collapsibles/RepeatYearly'

const Repeat = ({ isOpen, onClose, onEditTask, errorMessage, onChangeInput, isInvalid, showOption, options, selectedOption, onSelect }) => {
  const [isOpenWeekly, setIsOpenWeekly] = useState(false)
  const [isOpenMonthly, setIsOpenMonthly] = useState(false)
  const [isOpenYearly, setIsOpenYearly] = useState(false)

  const toggleWeekly = e => {
    setIsOpenWeekly(e.target.checked)
  }

  const toggleMonthly = e => {
    setIsOpenMonthly(e.target.checked)
  }

  const toggleYearly = e => {
    setIsOpenYearly(e.target.checked)
  }

  return (
    <Modal minW={'fit-content'} isOpen={isOpen} onClose={onClose} modalHeading='Repeat' subHeading={'Capital budgeting'}>
      <Form onSubmit={onEditTask} isInvalid={isInvalid}>
        <ModalBody paddingY={0}>
          {/* Weekly */}
          <RepeatWeekly toggleWeekly={toggleWeekly} isOpenWeekly={isOpenWeekly} />
          {/* Monthly */}
          <RepeatMonthly isOpenMonthly={isOpenMonthly} toggleMonthly={toggleMonthly} />
          {/* Yearly */}
          <RepeatYearly toggleYearly={toggleYearly} isOpenYearly={isOpenYearly} />
        </ModalBody>
        <ModalFooter paddingX={'15px'} paddingBottom='10px' paddingTop={0}>
          <Button margin={'10px'} onClick={onClose} title='Cancel' size='small' color='grey' />
          <Button margin={'10px'} title='Save' size='small' color='green' type='submit' />
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default Repeat
