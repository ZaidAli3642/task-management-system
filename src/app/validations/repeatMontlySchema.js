import * as yup from 'yup'

const repeatMonthlySchema = yup.object().shape({
  repetitionMonthlyNo: yup.number().typeError('Repetition must be a number').required().label('Repetition'),
})

export default repeatMonthlySchema
