import * as React from 'react';
import { useFormik } from 'formik';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { FormContainer, PageContainer } from './register.page.components.ts';
import { RegisterPageConstants } from './register.page.constants.ts';
import { Button, Link, Stack, TextField, Typography } from '@mui/material';
import { RegisterPageValidators } from './register.page.validators.ts';
import { AppRoutes } from '@constants/router.constants.ts';
import { useAuth } from '@context/AuthContext/auth.context.tsx';
import { IRegisterRequest } from '@models/auth.models.ts';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const redirect2Login = () => {
    navigate(AppRoutes.LOGIN);
  }

  const handleFormSubmit = async (values: any) => {
    const body: IRegisterRequest = {
      address: values.address,
      email: values.email,
      password: values.password,
      username: values.username,
      first_name: values.first_name,
      last_name: values.last_name,
      phone_number: values.phone_number,
    }

    await register(body).then(() => redirect2Login());
  };

  const formik = useFormik({
    initialValues: RegisterPageConstants.initialValues,
    validationSchema: RegisterPageValidators.ValidationSchema,
    onSubmit: handleFormSubmit,
  });

  return (
    <PageContainer>
      <FormContainer>
        <form onSubmit={formik.handleSubmit}>
          <Stack gap={2}>
            <Typography variant="h5">Register</Typography>

            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              required
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <TextField
              fullWidth
              id="username"
              name="username"
              label="Username"
              required
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />

            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              required
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            <Typography variant="h5">Personal Information</Typography>

            <TextField
              fullWidth
              id="firstName"
              name="firstName"
              label="First Name"
              required
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />

            <TextField
              fullWidth
              id="lastName"
              name="lastName"
              label="Last Name"
              required
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />

            <Typography variant="h5">Contact Information</Typography>

            <TextField
              fullWidth
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              required
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
            />

            <TextField
              fullWidth
              id="address"
              name="address"
              label="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={!formik.dirty || !formik.isValid}
            >
              Log In
            </Button>

            <Link component={RouterLink} to={AppRoutes.LOGIN}>
              I have an account
            </Link>
          </Stack>
        </form>
      </FormContainer>
    </PageContainer>
  );
};
