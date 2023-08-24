import * as yup from 'yup'

const taskSchema = yup.object().shape({
  name: yup.string().required().label('Name'),
  id: yup.number().typeError('Task group is a required field').required().label('Task group'),
})

export default taskSchema
