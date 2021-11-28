import { useReducer } from 'react';
import { AppContext, reducer, initialState } from '../../contexts/AppContext';
import AdminControls from '../AdminControls';

import Form from '../Form';
import TranslucentBorderContainer from '../TranslucentBorderContainer';
import UsersTable from '../UsersTable';

import './styles.css';

const AppContainer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="app-container">
      <AppContext.Provider value={{ state, dispatch }}>
        <div className="app">
          <TranslucentBorderContainer>
            <h1>Projeto React - WorkDB</h1>
          </TranslucentBorderContainer>
          <Form dispatch={dispatch} />
          <UsersTable users={state.users} dispatch={dispatch} />
          <AdminControls />
        </div>
      </AppContext.Provider>
    </div>
  );
};

export default AppContainer;
