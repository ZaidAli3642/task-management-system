import * as yup from 'yup'

const taskGroupSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/[a-zA-Z]/, 'Input must contain at least one alphabet character')
    .required()
    .label('Name'),
})

export default taskGroupSchema
