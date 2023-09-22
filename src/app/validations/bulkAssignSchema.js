import * as yup from 'yup'

const bulkAssignSchema = yup.object().shape({
  repetitionMonthlyNo: yup.number().typeError('Repetition must be a number').required().label('Repetition'),
  repetitionWeeklyNo: yup.number().typeError('Repetition must be a number').required().label('Repetition'),
  responsibleId: yup.number().typeError('Responsible is a required field').nullable().required().label('Responsible'),
})

export default bulkAssignSchema
