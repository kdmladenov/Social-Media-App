import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import './styles/StoryMessageForm.css';

import Button from '../../../components/Button';
import ValidationsType from '../../../types/ValidationsType';
import FormInputDataType from '../../../types/FormInputDataType';
import FormToRenderType from '../../../types/FormToRenderType';
import StoryMessageFormProps from '../../../types/components/StoryMessageFormProps';

const StoryMessageForm: React.FC<StoryMessageFormProps> = ({
  inputData,
  resourceId,
  updateAction,
  validateInput
}) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState<FormInputDataType>(inputData);
  const [isFormValid, setIsFormValid] = useState(true);
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

    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;

    const updatedForm = { ...form };
    updatedForm[name].value = value;
    updatedForm[name].touched = true;
    updatedForm[name].valid = isInputValid(value, updatedForm[name].validations);

    validateInput && setInputErrors({ ...inputErrors, [name]: validateInput[name](value) });

    setForm(updatedForm);
    setIsFormValid(
      Object.values(updatedForm).every((elem) =>
        elem.validations.required ? elem.touched && elem.valid : elem.valid
      )
    );
  };
  
  const handleCancelMessageButton = () => {
    setForm({ ...form, message: { ...form.message, value: '' } });
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
        <select
          style={{
            background: `${
              key === 'messageColor' ? form?.messageColor?.value : form?.messageBackground?.value
            }`
          }}
          key={key}
          name={key}
          value={config?.value}
          className={key}
          onChange={(e) => handleInputChange(e)}
        >
          <option value={config?.value}>{`${config?.label}`}</option>
          {config.options
            ?.filter((item) => item?.value !== config?.value)
            .map((item) => (
              <option
                key={item?.label}
                value={item?.value}
                style={{
                  background: `${item?.value}`
                }}
              >
                {item?.label}
              </option>
            ))}
        </select>
      ) : (
        <input
          style={{
            fontSize: `${form?.messageSize?.value}px`,
            color: `${form?.messageColor?.value}`,
            background: `${form?.messageBackground?.value}`
          }}
          type={config.type}
          key={key}
          name={key}
          min={config?.min}
          max={config?.max}
          step={config?.step}
          placeholder={config?.value || config?.placeholder}
          value={config.type === 'date' ? config.value.slice(0, 10) : config.value}
          onChange={(e) => handleInputChange(e)}
        />
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
      updateAction(resourceId, {
        ...data
      })
    );
  };

  return (
    <form onSubmit={handleSubmit} className="story_message_form">
      {formToRender}
      <div
        className={`button_group${
          Object.values(form).some((input) => input.touched) ? ' show' : ''
        }`}
      >
        <Button classes="rounded green" type="submit" disabled={!isFormValid}>
          Add & Save
        </Button>
        <Button classes="rounded orange" type="submit" onClick={handleCancelMessageButton}>
          Cancel & Save
        </Button>
      </div>
    </form>
  );
};

export default StoryMessageForm;
