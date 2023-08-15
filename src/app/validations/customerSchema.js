import * as yup from 'yup'

const customerSchema = yup.object().shape({
  code: yup.string().label('Code'),
  description: yup.string().label('Description'),
  name: yup.string().required().label('Name'),
})

export default customerSchema
