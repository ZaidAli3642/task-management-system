import * as yup from 'yup'

const noteSchema = yup.object().shape({
  note: yup.string().required().label('Note'),
})

export default noteSchema
