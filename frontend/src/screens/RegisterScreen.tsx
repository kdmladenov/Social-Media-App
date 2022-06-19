import React from 'react';

import './styles/RegisterScreen.css';
import { register } from '../state/actions/userActions';
import validateInputUser from '../validations/userValidator';
import userRegisterInitialInputState from '../inputs/userRegisterInitialInputState';

import FormComponent from '../components/FormComponent';

const RegisterScreen = () => {
  return (
    <div className="register_screen flex">
      <div className="register_container card flex">
        <h1>Register</h1>
        <FormComponent
          inputData={userRegisterInitialInputState}
          createAction={register}
          validateInput={validateInputUser}
          mode="create"
          screen="register"
        />
      </div>
    </div>
  );
};

export default RegisterScreen;
