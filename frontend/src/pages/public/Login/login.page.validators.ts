import * as Yup from 'yup';

export namespace LoginPageValidators {
  export const ValidationSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Min length is 2')
      .max(40, 'Max length is 40')
      .required('Field is required'),
    password: Yup.string()
      .min(8, 'Min length is 8')
      .max(60, 'Max length is 60')
      .required('Field is required'),
  });
}
