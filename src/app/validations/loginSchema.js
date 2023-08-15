import * as yup from 'yup'

const loginSchema = yup.object().shape({
  password: yup.string().required().label('Password'),
  username: yup.string().required().label('Username'),
})

export default loginSchema
