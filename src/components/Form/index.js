import { useContext, useReducer, useState } from 'react';
import moment from 'moment';
import { nanoid } from 'nanoid';

import { actionTypes } from '../../contexts/AppContext';
import { AppContext } from '../../contexts/AppContext';

import FormInput from '../FormInput';
import SectionHeading from '../SectionHeading';
import Button from '../Button';

import logo from '../../assets/img/logo.png';
import './styles.css';
import {
  formValidationReducer,
  initialState,
  BIRTHDATE_ERROR,
  FIRST_NAME_ERROR,
  HEIGHT_ERROR,
  LAST_NAME_ERROR,
} from './formValidationReducer';

const isNameValid = (name) => /\w{2,}/.test(name);
const isHeightValid = (height) => /^[0-9]+$/.test(height);

const getBirthdateString = (birthdate) => {
  let birthdateString, momentDateObject;

  if (birthdate?._isAMomentObject) {
    birthdateString = birthdate.format('DD/MM/yyyy');
    momentDateObject = birthdate;
  } else if (birthdate) {
    const [day, month, year] = birthdate.split('/');
    const momentDateString = [month, day, year].join('-');

    momentDateObject = moment(momentDateString);
    birthdateString = birthdate;
  } else return;

  return momentDateObject.isBefore(moment()) ? birthdateString : null;
};

const Form = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [height, setHeight] = useState('');
  const [errors, errorsDispatch] = useReducer(
    formValidationReducer,
    initialState
  );

  const {
    birthdate: birthdateError,
    firstName: firstNameError,
    lastName: lastNameError,
    height: heightError,
  } = errors;

  const { dispatch } = useContext(AppContext);

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setBirthdate(null);
    setHeight('');
  };

  const validateForm = () => {
    const firstNameIsValid = isNameValid(firstName),
      lastNameIsValid = isNameValid(lastName),
      heightIsValid = isHeightValid(height),
      birthdateIsValid = !!birthdate;

    errorsDispatch({ type: FIRST_NAME_ERROR, payload: firstNameIsValid });
    errorsDispatch({ type: LAST_NAME_ERROR, payload: lastNameIsValid });
    errorsDispatch({ type: HEIGHT_ERROR, payload: heightIsValid });
    errorsDispatch({ type: BIRTHDATE_ERROR, payload: birthdateIsValid });

    return firstNameIsValid && lastNameIsValid && heightIsValid;
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const birthdateString = getBirthdateString(birthdate);
    console.log(birthdate);

    if (validateForm() && birthdateString) {
      const newUser = {
        id: nanoid(),
        firstName,
        lastName,
        birthdate: birthdateString,
        height: parseInt(height),
      };

      dispatch({ type: actionTypes.ADD_USER, payload: newUser });
      clearForm();
    }
  };

  const handleFirstNameChange = (name) => {
    setFirstName(name);
    const firstNameIsValid = isNameValid(name);
    errorsDispatch({ type: FIRST_NAME_ERROR, payload: firstNameIsValid });
  };

  const handleLastNameChange = (name) => {
    const lastNameIsValid = isNameValid(name);
    errorsDispatch({ type: LAST_NAME_ERROR, payload: lastNameIsValid });
    setLastName(name);
  };

  const handleBirthdateChange = (value) => {
    const birthdateIsValid = !!value;
    errorsDispatch({ type: BIRTHDATE_ERROR, payload: birthdateIsValid });
    setBirthdate(value);
  };

  const handleHeightChange = (value) => {
    const heightIsValid = isHeightValid(value);
    errorsDispatch({ type: HEIGHT_ERROR, payload: heightIsValid });
    setHeight(value);
  };

  return (
    <div className="form-container">
      <img className="logo" src={logo} alt="logo workdb" />
      <SectionHeading title="CADASTRO" />
      <form className="form">
        <FormInput
          id="first-name-input"
          name="first-name"
          type="text"
          label="Nome"
          placeholder="João"
          value={firstName}
          onChange={({ target: { value } }) => handleFirstNameChange(value)}
          errorMessage={firstNameError}
        />
        <FormInput
          id="last-name-input"
          name="last-name"
          type="text"
          label="Sobrenome"
          placeholder="Silva"
          value={lastName}
          onChange={({ target: { value } }) => handleLastNameChange(value)}
          errorMessage={lastNameError}
        />
        <FormInput
          id="birthdate-input"
          name="birthdate"
          type="date"
          label="Data de Nascimento"
          placeholder="DD/MM/AAAA"
          value={birthdate}
          onChange={(value) => handleBirthdateChange(value)}
          errorMessage={birthdateError}
        />
        <FormInput
          id="height-input"
          name="height"
          type="number"
          label="Altura em Centímetros"
          placeholder="172"
          value={height}
          onChange={({ target: { value } }) => handleHeightChange(value)}
          errorMessage={heightError}
        />
        <Button onClick={handleAddUser} title="INSERIR" color="blue" />
      </form>
    </div>
  );
};

export default Form;
