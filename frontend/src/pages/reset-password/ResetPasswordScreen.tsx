import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import FormComponent from '../../components/FormComponent';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { resetPassword } from '../../context/actions/userActions';
import userResetPasswordInitialInputState from '../../data/inputs/userResetPasswordInitialInputState';
import validateInputUser from '../../data/validations/userValidator';
import useTypedSelector from '../../hooks/useTypedSelector';

import './ResetPasswordScreen.css';

const ResetPasswordScreen: React.FC = () => {
  const { userId, token } = useParams();
  const navigate = useNavigate();

  const {
    loading,
    success: successResetPassword,
    message: successResetMessage,
    error: errorMessage
  } = useTypedSelector((state) => state.passwordReset);

  const { userInfo } = useTypedSelector((state) => state.userLogin);

  useEffect(() => {
    if (!errorMessage && userInfo?.token) {
      navigate('/');
    }
  }, [navigate, userInfo, errorMessage]);

  return (
    <div className="reset_password_screen flex">
      <div className="reset_password_container card flex">
        <h1>Reset your password</h1>
        <h5>Please enter your new password</h5>
        {loading && <Loader />}
        {errorMessage && <Message type="error">{errorMessage}</Message>}
        {successResetPassword && userId ? (
          <>
            <Message type="success">{successResetMessage}</Message>
            <Button classes="white" onClick={() => navigate('/login')}>
              Go to login page
            </Button>
          </>
        ) : (
          <FormComponent
            inputData={userResetPasswordInitialInputState}
            authorizationAction={resetPassword}
            validateInput={validateInputUser}
            screen="resetPassword"
            resourceId={+userId!}
            resetPasswordToken={token}
          />
        )}
      </div>
    </div>
  );
};

export default ResetPasswordScreen;
