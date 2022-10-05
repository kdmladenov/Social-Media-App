import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FormComponent from '../../components/FormComponent';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { login } from '../../context/actions/userActions';
import userLoginInitialInputState from '../../data/inputs/userLoginInitialInputState';
import validateInputUser from '../../data/validations/userValidator';
import useTypedSelector from '../../hooks/useTypedSelector';

import './LoginScreen.css';

const LoginScreen: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userLogin = useTypedSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (!error && userInfo?.token) {
      navigate(redirect);
    }
  }, [navigate, userInfo, error, redirect]);

  return (
    <div className="login_screen flex">
      <div className="login_container card flex">
        <h1>Log In</h1>
        {loading && <Loader />}
        {error && <Message type="error">{error}</Message>}

        <FormComponent
          inputData={userLoginInitialInputState}
          authorizationAction={login}
          validateInput={validateInputUser}
          screen="login"
        />
        <div className="registerRedirect">
          <span>New Customer ? </span>
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
        </div>
        <div className="registerRedirect">
          <span>Forgot your password ? </span>
          <Link to={redirect ? `/forgotPassword?redirect=${redirect}` : '/forgotPassword'}>
            Reset
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
