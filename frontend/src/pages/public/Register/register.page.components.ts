import styled from 'styled-components';
import { Paper } from '@mui/material';

export const PageContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormContainer = styled(Paper)`
  width: 100%;
  max-width: 36rem;
  padding: 3.5rem 2rem;
`;
