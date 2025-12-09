import React, { Suspense } from 'react';
import ResetPasswordForm from './ResetPasswordForm';

const ResetPasswordPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default ResetPasswordPage;