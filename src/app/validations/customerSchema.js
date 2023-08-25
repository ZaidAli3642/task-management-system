import * as yup from 'yup'

const customerSchema = yup.object().shape({
  code: yup.string().nullable().label('Code'),
  description: yup.string().nullable().label('Description'),
  name: yup
    .string()
    .matches(/[a-zA-Z]/, 'Input must contain at least one alphabet character')
    .required()
    .label('Name'),
})

export default customerSchema
