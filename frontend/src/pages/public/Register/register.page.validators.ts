import * as Yup from 'yup';

export namespace RegisterPageValidators {
  export const ValidationSchema = Yup.object().shape({
    username: Yup.string()
      .max(150, 'Max length is 150')
      .required('Field is required'),
    password: Yup.string()
      .min(8, 'Min length is 8')
      .max(60, 'Max length is 255')
      .required('Field is required'),
    email: Yup.string()
      .email()
      .max(255, 'Max length is 255')
      .required('Field is required'),
    firstName: Yup.string()
      .max(255, 'Max length is 255')
      .required('Field is required'),
    lastName: Yup.string()
      .max(255, 'Max length is 255')
      .required('Field is required'),
    phoneNumber: Yup.string()
      .max(255, 'Max length is 255')
      .required('Field is required'),
    address: Yup.string().max(60, 'Max length is 255'),
  });
}
