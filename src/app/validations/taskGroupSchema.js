import * as yup from 'yup'

const taskGroupSchema = yup.object().shape({
  name: yup.string().required().label('Name'),
})

export default taskGroupSchema
