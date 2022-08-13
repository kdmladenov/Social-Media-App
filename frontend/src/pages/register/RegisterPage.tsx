import React from 'react';

import './styles/RegisterPage.css';
import { register } from '../../context/actions/userActions';
import validateInputUser from '../../data/validations/userValidator';
import userRegisterInitialInputState from '../../data/inputs/userRegisterInitialInputState';

import FormComponent from '../../components/FormComponent';

const RegisterPage = () => {
  return (
    <div className="register_page flex">
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

export default RegisterPage;
