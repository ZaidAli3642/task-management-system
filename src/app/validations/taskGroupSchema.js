import * as yup from 'yup'

const taskGroupSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zA-Z\s]+$/, 'Input must contain only alphabets')
    .required()
    .label('Name'),
})

export default taskGroupSchema
