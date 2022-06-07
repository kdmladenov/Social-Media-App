import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import './styles/Login.css';
import { login } from '../state/actions/userActions';
import useTypedSelector from '../hooks/useTypedSelector';

import Loader from './Loader';
import Message from './Message';
import Button from './Button';
import Tooltip from './Tooltip';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { userInfo, loading, error } = useTypedSelector((state) => state.userLogin);

  useEffect(() => {
    if (!error && userInfo?.token) {
      navigate('/');
    }
  }, [navigate, userInfo, error]);

  const loginHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  const showPasswordHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="login_form">
      <h1>Sign In</h1>
      {loading && <Loader />}
      {error && <Message type="error">{error}</Message>}
      <form>
        <h4>E-mail</h4>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="password">
          <h4>Password</h4>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button classes="icon" onClick={showPasswordHandler}>
            <Tooltip
              direction="top"
              text={showPassword ? <h5>Hide password</h5> : <h5>Show password</h5>}
            >
              <i className="fa fa-eye" />
            </Tooltip>
          </Button>
        </div>

        <button onClick={loginHandler}>Log In</button>
      </form>
      <div className="registerRedirect">
        New Customer?
        <Link to={'/register'}> Register</Link>
      </div>
      <div className="forgottenPasswordRedirect">
        Forgot your password?
        <Link to={'/forgotPassword'}> Reset</Link>
      </div>
    </div>
  );
};

export default Login;
