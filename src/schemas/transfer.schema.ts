import * as yup from 'yup'

export default {
  transaction: yup.object().shape({
    username: yup.string().nullable(),
    value: yup.number().min(1).required(),
    name: yup.string().nullable(),
  }),
  serialization: yup.object().shape({
    id: yup.number().required(),
    date: yup.string().required(),
    transferedValue: yup.number().required(),
    userOrigin: yup.object().shape({
      username: yup.string().required(),
      name: yup.string().nullable(),
    }),
  }),
  historySerialization: yup.array().of(
    yup.object().shape({
      id: yup.number().required(),
      date: yup.string().required(),
      transferedValue: yup.number().required(),
      userOrigin: yup.object().shape({
        username: yup.string().required(),
        name: yup.string().nullable(),
      }),
      userRecipient: yup
        .object()
        .shape({
          username: yup.string().required(),
          name: yup.string().nullable(),
        })
        .nullable(),
    })
  ),
  transfer: yup.object().shape({
    value: yup.number().required().min(1),
  }),
}
