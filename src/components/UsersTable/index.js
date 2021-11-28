import { useContext, useReducer, useState } from 'react';
import moment from 'moment';

import { AppContext, actionTypes } from '../../contexts/AppContext';

import SectionHeading from '../SectionHeading';
import TranslucentBorderContainer from '../TranslucentBorderContainer';

import { reducer, initialState } from './searchReducer';

import {
  CLEAR_SEARCH,
  SET_AGE,
  SET_BIRTHDATE,
  SET_HEIGHT,
  SET_NAME,
} from './searchActions';

import {
  sortAlphabetically,
  sortChronologically,
  sortNumerically,
} from './sortingFunctions';

import './styles.css';

const now = moment();

const calculateAge = (birthdate) => {
  const [day, month, year] = birthdate.split('/');
  const birthdateString = [year, month, day].join('-');

  return now.diff(birthdateString, 'years');
};

const sortingFunctions = {
  firstName: sortAlphabetically,
  lastName: sortAlphabetically,
  height: sortNumerically,
  birthdate: sortChronologically,
  age: sortChronologically,
};

const UsersTable = () => {
  const { state, dispatch } = useContext(AppContext);
  const [sortingKey, setSortingKey] = useState('firstName');
  const [ascending, setAscending] = useState(false);
  const [filters, filtersDispatch] = useReducer(reducer, initialState);

  const {
    age: ageFilter,
    birthdate: birthdateFilter,
    name: nameFilter,
    height: heightFilter,
  } = filters;

  const { users } = state;

  const sortingFunction = sortingFunctions[sortingKey];

  const filteredUsers = Object.entries(filters).reduce((acc, cur) => {
    const [key, filterOption] = cur;

    if (filterOption.length && acc.length) {
      if (key === 'age') {
        return acc.filter((user) => {
          const age = calculateAge(user.birthdate).toString();
          return age.includes(filterOption);
        });
      } else if (key === 'name') {
        return acc.filter((user) => {
          const fullName = `${user.firstName} ${user.lastName}`;
          return fullName.toLowerCase().includes(filterOption.toLowerCase());
        });
      } else {
        return acc.filter((user) =>
          `${user[key]}`.toLowerCase().includes(filterOption.toLowerCase())
        );
      }
    } else return acc;
  }, users);

  const sortedUsers = sortingFunction(filteredUsers, sortingKey, ascending);

  const handleRemoveUser = (id) => {
    dispatch({ type: actionTypes.REMOVE_USER, payload: id });
  };

  const handleSort = (key) => {
    if (key === sortingKey) {
      setAscending(!ascending);
    } else {
      setAscending(true);
      setSortingKey(key);
    }
  };

  const handleSearchInput = (event, actionType) => {
    filtersDispatch({ type: actionType, payload: event.target.value });
  };

  const handleClearSearch = () => {
    filtersDispatch({ type: CLEAR_SEARCH });
  };

  return (
    <TranslucentBorderContainer>
      <SectionHeading title="DADOS CADASTRADOS" />
      <table className="table">
        <thead>
          <tr>
            <th
              onClick={() => handleSort('firstName')}
              className={[
                sortingKey === 'firstName' ? 'current-key' : '',
                ascending ? '' : 'descending',
              ].join(' ')}
            >
              Nome <span>▲</span>
            </th>
            <th
              onClick={() => handleSort('lastName')}
              className={[
                sortingKey === 'lastName' ? 'current-key' : '',
                ascending ? '' : 'descending',
              ].join(' ')}
            >
              Sobrenome <span>▲</span>
            </th>
            <th
              onClick={() => handleSort('height')}
              className={[
                sortingKey === 'height' ? 'current-key' : '',
                ascending ? '' : 'descending',
              ].join(' ')}
            >
              Altura (cm) <span>▲</span>
            </th>
            <th
              onClick={() => handleSort('birthdate')}
              className={[
                sortingKey === 'birthdate' ? 'current-key' : '',
                ascending ? '' : 'descending',
              ].join(' ')}
            >
              Nascimento <span>▲</span>
            </th>
            <th
              onClick={() => handleSort('birthdate')}
              className={[
                sortingKey === 'birthdate' ? 'current-key' : '',
                ascending ? 'descending' : '',
              ].join(' ')}
            >
              Idade <span>▲</span>
            </th>
            <th className="actions">Ações</th>
          </tr>
          <tr>
            <th colSpan="2">
              <input
                type="text"
                placeholder="buscar 🔍"
                value={nameFilter}
                onChange={(e) => handleSearchInput(e, SET_NAME)}
              />
            </th>
            <th className="height">
              <input
                type="text"
                placeholder="buscar 🔍"
                value={heightFilter}
                onChange={(e) => handleSearchInput(e, SET_HEIGHT)}
              />
            </th>
            <th className="birthdate">
              <input
                type="text"
                placeholder="buscar 🔍"
                value={birthdateFilter}
                onChange={(e) => handleSearchInput(e, SET_BIRTHDATE)}
              />
            </th>
            <th className="age">
              <input
                type="text"
                placeholder="buscar 🔍"
                value={ageFilter}
                onChange={(e) => handleSearchInput(e, SET_AGE)}
              />
            </th>
            <th className="actions">
              <button className="remove" onClick={handleClearSearch}>
                Limpar Busca
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={`user-${user.id}`}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td className="height space-out">{user.height}</td>
              <td className="birthdate space-out">{user.birthdate}</td>
              <td className="age space-out">{calculateAge(user.birthdate)}</td>
              <td className="action">
                <button
                  className="remove"
                  onClick={() => handleRemoveUser(user.id)}
                >
                  Remover <span>⨂</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {sortedUsers.length === 0 && (
        <div className="no-data">
          <p>Nenhum cadastro para mostrar... 😵</p>
        </div>
      )}
    </TranslucentBorderContainer>
  );
};

export default UsersTable;
