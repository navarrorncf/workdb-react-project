import {
  CLEAR_SEARCH,
  SET_AGE,
  SET_BIRTHDATE,
  SET_HEIGHT,
  SET_NAME,
} from './searchActions';

export const initialState = {
  name: '',
  height: '',
  birthdate: '',
  age: '',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case CLEAR_SEARCH:
      return initialState;
    case SET_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case SET_HEIGHT:
      return {
        ...state,
        height: action.payload,
      };
    case SET_BIRTHDATE:
      return {
        ...state,
        birthdate: action.payload,
      };
    case SET_AGE:
      return {
        ...state,
        age: action.payload,
      };
    default:
      return state;
  }
};
