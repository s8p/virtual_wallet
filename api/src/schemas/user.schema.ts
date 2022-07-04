import { hashSync } from 'bcrypt'
import * as yup from 'yup'
export default {
  registration: yup.object().shape({
    username: yup.string().required(),
    password: yup
      .string()
      .required()
      .transform((pwd: string) => hashSync(pwd, 10)),
    name: yup.string().nullable(),
    balance: yup.number().min(0).default(0),
  }),
  login: yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  }),
  serialization: yup.object().shape({
    username: yup.string().required(),
    name: yup.string().nullable(),
    balance: yup.number().required(),
  }),
}
