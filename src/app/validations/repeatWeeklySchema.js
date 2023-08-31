import * as yup from 'yup'

const repeatWeeklySchema = yup.object().shape({
  repetitionWeeklyNo: yup.number().typeError('Repetition must be a number').required().label('Repetition'),
})

export default repeatWeeklySchema
