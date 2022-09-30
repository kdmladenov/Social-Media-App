import React from 'react';
import FormComponent from '../../components/FormComponent';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { forgotPassword } from '../../context/actions/userActions';
import userForgottenPasswordInitialInputState from '../../data/inputs/userForgottenPasswordInitialInputState';
import validateInputUser from '../../data/validations/userValidator';
import useTypedSelector from '../../hooks/useTypedSelector';

import './ForgottenPasswordScreen.css';


const ForgottenPasswordScreen = () => {
  const forgottenPassword = useTypedSelector((state) => state.forgottenPassword);
  const { loading, success: successSubmitEmail, error } = forgottenPassword;

  return (
    <div className="forgotten_password_screen flex">
      <div className="forgotten_password_container card flex">
        <h1>Forgot your password?</h1>
        <h5>Please enter your email address to request a password reset</h5>
        {loading && <Loader />}
        {error && <Message type="error">{error}</Message>}
        {successSubmitEmail ? (
          <Message type="success">
            <span>An email with further instructions is sent to the provided email.</span>
          </Message>
        ) : (
          <FormComponent
            inputData={userForgottenPasswordInitialInputState}
            authorizationAction={forgotPassword}
            validateInput={validateInputUser}
            screen="forgottenPassword"
          />
        )}
      </div>
    </div>
  );
};

export default ForgottenPasswordScreen;
