export const initialState = {
  birthdate: '',
  firstName: '',
  lastName: '',
  height: '',
};

const ERROR_MESSAGES = {
  BIRTHDATE_ERROR: 'Por favor, preencha a data de nascimento',
  FIRST_NAME_ERROR: 'Por favor, preencha o nome do usuário',
  LAST_NAME_ERROR: 'Por favor, preencha o sobrenome do usuário',
  HEIGHT_ERROR: 'Por favor, preencha um número inteiro',
};

export const BIRTHDATE_ERROR = 'BIRTHDATE_ERROR';
export const FIRST_NAME_ERROR = 'FIRST_NAME_ERROR';
export const LAST_NAME_ERROR = 'LAST_NAME_ERROR';
export const HEIGHT_ERROR = 'HEIGHT_ERROR';

export const formValidationReducer = (state, action) => {
  switch (action.type) {
    case BIRTHDATE_ERROR:
      return {
        ...state,
        birthdate: action.payload ? '' : ERROR_MESSAGES.BIRTHDATE_ERROR,
      };
    case FIRST_NAME_ERROR:
      return {
        ...state,
        firstName: action.payload ? '' : ERROR_MESSAGES.FIRST_NAME_ERROR,
      };
    case LAST_NAME_ERROR:
      return {
        ...state,
        lastName: action.payload ? '' : ERROR_MESSAGES.LAST_NAME_ERROR,
      };
    case HEIGHT_ERROR:
      return {
        ...state,
        height: action.payload ? '' : ERROR_MESSAGES.HEIGHT_ERROR,
      };
    default:
      return state;
  }
};
