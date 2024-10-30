import * as React from 'react';
import { useFormik } from 'formik';
import { FormContainer, PageContainer } from './login.page.components.ts';
import { LoginPageConstants } from './login.page.constants.ts';
import { Button, Link, Stack, TextField, Typography } from '@mui/material';
import { LoginPageValidators } from './login.page.validators.ts';
import { Link as RouterLink } from 'react-router-dom';
import { AppRoutes } from '@constants/router.constants.ts';
import { useAuth } from '@context/AuthContext/auth.context.tsx';
import { ILoginRequest } from '@models/auth.models.ts';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();

  const handleFormSubmit = (values: ILoginRequest) => {
    login(values);
  };

  const formik = useFormik({
    initialValues: LoginPageConstants.initialValues,
    validationSchema: LoginPageValidators.ValidationSchema,
    onSubmit: handleFormSubmit,
  });

  return (
    <PageContainer>
      <FormContainer>
        <form onSubmit={formik.handleSubmit}>
          <Stack gap={2}>
            <Typography variant="h5">Log In</Typography>

            <TextField
              fullWidth
              id="username"
              name="username"
              label="Username"
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
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={!formik.dirty || !formik.isValid}
            >
              Log In
            </Button>

            <Link component={RouterLink} to={AppRoutes.REGISTER}>
              Create new account
            </Link>
          </Stack>
        </form>
      </FormContainer>
    </PageContainer>
  );
};
