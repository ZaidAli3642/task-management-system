import * as yup from 'yup'

const employeeSchemaEdit = yup.object().shape({
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], "Your password doesn't match")
    .label('Password'),
  password: yup.string().label('Password'),
  username: yup.string().required().label('Username'),
  lastname: yup.string().required().label('Last name'),
  firstname: yup.string().required().label('First name'),
})

export default employeeSchemaEdit
