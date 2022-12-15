import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import './styles/FormComponent.css';

import Button from './Button';
import FormComponentProps from '../types/components/FormComponentProps';
import ValidationsType from '../types/ValidationsType';
import FormInputDataType from '../types/FormInputDataType';
import FormToRenderType from '../types/FormToRenderType';
import UserType from '../types/UserType';
import PostType from '../types/PostType';
import WorkplaceType from '../types/WorkplaceType';
import SchoolType from '../types/SchoolType';
import Divider from './Divider';
import { login } from '../context/actions/userActions';
import { TEST_ACCOUNT_EMAIL, TEST_ACCOUNT_PASSWORD } from '../data/constants';

const FormComponent: React.FC<FormComponentProps> = ({
  inputData,
  screen,
  resource,
  resourceId,
  subResourceId,
  updateAction,
  createAction,
  authorizationAction,
  getDetailsAction,
  successUpdate,
  validateInput,
  resetPasswordToken,
  mode
}) => {
  const dispatch = useDispatch();

  const [isFormValid, setIsFormValid] = useState(true);
  const [isResourceLoaded, setIsResourceLoaded] = useState(false);
  const [isResourceUpdated, setIsResourceUpdated] = useState(false);

  const [form, setForm] = useState<FormInputDataType>(inputData);

  const [inputErrors, setInputErrors] = useState<{ [key: string]: string }>(
    Object.keys(form).reduce((acc, key) => {
      return {
        ...acc,
        [key]: ''
      };
    }, {})
  );

  const isInputValid = (input: string, validations: ValidationsType) => {
    if (validations.required && input.length === 0) return false;
    if (validations.minValue && +input <= validations.minValue) return false;
    if (validations.maxValue && +input >= validations.maxValue) return false;
    if (validations.minLength && input.length < validations.minLength) return false;
    if (validations.maxLength && input.length > validations.maxLength) return false;
    if (validations.format && !validations.format.test(input)) return false;

    return true;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    match?: string
  ) => {
    const { name, value } = e.target;

    const updatedForm = { ...form };
    updatedForm[name].value = value;
    updatedForm[name].touched = true;
    updatedForm[name].valid = isInputValid(value, updatedForm[name].validations);

    validateInput && setInputErrors({ ...inputErrors, [name]: validateInput[name](value, match) });
    setForm(updatedForm);
    setIsFormValid(
      Object.values(updatedForm).every((elem) =>
        mode === 'create' && elem.validations.required ? elem.touched && elem.valid : elem.valid
      )
    );
  };

  const handleCancelButton = () => {
    setForm(inputData);
    setIsResourceUpdated(true);
    setInputErrors(
      Object.keys(form).reduce((acc, key) => {
        return {
          ...acc,
          [key]: ''
        };
      }, {})
    );
  };

  const formToRender = Object.keys(form)
    .map((name: keyof typeof form) => {
      return {
        key: name.toString(),
        config: form[name]
      };
    })
    .map(({ key, config }: FormToRenderType) => {
      return config.formElement === 'select' ? (
        <select key={key} name={key} value={config?.value} onChange={(e) => handleInputChange(e)}>
          <option value="">{`${config?.label}: ${config?.value || ''}`}</option>
          {config.options
            ?.filter((item) => item?.value !== config?.value)
            .map((item) => (
              <option key={item?.label} value={item?.value}>
                {item?.label}
              </option>
            ))}
        </select>
      ) : (
        <div
          className={`wrapper ${config.value !== '' ? 'filled' : ''} ${
            inputErrors[key] ? 'error' : ''
          } ${config.touched ? 'touched' : ''}`}
          key={key}
        >
          <label htmlFor={key}>{config.label}</label>
          <div className="underline" />
          {inputErrors[key] && (
            <div className="error_message">{`${config.label} ${inputErrors[key]}`}</div>
          )}
          <input
            type={config.type}
            key={key}
            name={key}
            placeholder={config.value}
            value={config.type === 'date' ? config.value.slice(0, 10) : config.value}
            //match values as 2nd param of onChange
            onChange={(e) =>
              handleInputChange(
                e,
                key === 'reenteredEmail'
                  ? form.email.value
                  : key === 'reenteredPassword'
                  ? form.password.value
                  : key === 'endDate'
                  ? form.startDate.value
                  : key === 'endYear'
                  ? form.startYear.value
                  : ''
              )
            }
          />
        </div>
      );
    });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.keys(form).reduce((acc, key) => {
      return {
        ...acc,
        [key]: form[key].value
      };
    }, {});

    dispatch(
      screen === 'login' || screen === 'forgottenPassword'
        ? authorizationAction(data)
        : screen === 'resetPassword'
        ? authorizationAction({ ...data, userId: resourceId, token: resetPasswordToken })
        : mode === 'update'
        ? updateAction(subResourceId || resourceId, {
            ...data
          })
        : mode === 'create' && (resourceId || subResourceId)
        ? createAction(resourceId || subResourceId, {
            ...data
          })
        : createAction({
            ...data
          })
    );

    setIsResourceUpdated(true);
  };

    const testAccountLoginHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
      dispatch(login({ email: TEST_ACCOUNT_EMAIL, password: TEST_ACCOUNT_PASSWORD }));
    };


  useEffect(() => {
    if (getDetailsAction) {
      if (isResourceUpdated && resourceId) {
        dispatch(getDetailsAction(resourceId));
        setIsResourceUpdated(false);
      } else {
        const updatedFormData: FormInputDataType = Object.keys(form).reduce((acc, key) => {
          return {
            ...acc,
            [key]: {
              ...form[key],
              value:
                mode === 'create'
                  ? ''
                  : resource?.[key as keyof (UserType | SchoolType | WorkplaceType | PostType)]
            }
          };
        }, {});
        setForm(updatedFormData);
        setIsResourceLoaded(true);
      }
    }
  }, [
    dispatch,
    resource,
    resourceId,
    successUpdate,
    getDetailsAction,
    isResourceLoaded,
    isResourceUpdated,
    mode
  ]);

  return (
    <form onSubmit={handleSubmit} className="form_component">
      {formToRender}
      <div
        className={`button_group${
          Object.values(form).some((input) => input.touched) ? ' show' : ''
        }`}
      >
        <Button
          classes="rounded green"
          type="submit"
          disabled={!(isFormValid && Object.values(inputErrors).every((error) => error === ''))}
        >
          {screen === 'register'
            ? 'Register'
            : screen === 'login'
            ? 'Login'
            : screen === 'forgottenPassword'
            ? 'Request Password Reset'
            : screen === 'resetPassword'
            ? 'Reset Password'
            : 'Save'}
        </Button>

        {screen !== 'register' &&
          screen !== 'resetPassword' &&
          screen !== 'login' &&
          screen !== 'forgottenPassword' && (
            <Button classes="rounded orange" onClick={handleCancelButton}>
              Cancel
            </Button>
          )}
      </div>
      {screen === 'login' && (
        <div className="test_user_btn flex_col">
          <Divider>or</Divider>
          <Button classes="rounded green" onClick={(e) => testAccountLoginHandler(e)}>
            Log in with a test user
          </Button>
        </div>
      )}
    </form>
  );
};

export default FormComponent;
