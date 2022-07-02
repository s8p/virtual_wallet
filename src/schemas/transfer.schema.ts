import * as yup from 'yup'

export default {
  transaction: yup.object().shape({
    username: yup.string().required(),
    value: yup.number().min(1).required(),
  }),
}
