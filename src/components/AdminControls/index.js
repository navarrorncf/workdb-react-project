import { useContext } from 'react';
import { actionTypes, AppContext } from '../../contexts/AppContext';

import Button from '../Button';
import TranslucentBorderContainer from '../TranslucentBorderContainer';

import './styles.css';

const AdminControls = () => {
  const { state, dispatch } = useContext(AppContext);

  const handleClearUsers = () => {
    dispatch({ type: actionTypes.CLEAR_USERS });
  };

  const handleShowJSON = () => {
    const usersJSON = JSON.stringify(state.users, null, 2);

    const body = document.createElement('body');
    const head = document.createElement('head');

    head.innerHTML = '<title>Registros - JSON</title>';

    const preTag = document.createElement('pre');
    preTag.innerHTML = usersJSON;

    body.appendChild(preTag);

    const newTab = window.open('', '_blank');
    newTab.document.write(head.innerHTML);
    newTab.document.write(body.innerHTML);
  };

  return (
    <TranslucentBorderContainer>
      <h2>OPÇÕES AVANÇADAS</h2>
      <div className="controls">
        <Button title="LIMPAR" color="red" onClick={handleClearUsers} />
        <Button title="EXPORTAR" color="green" onClick={handleShowJSON} />
      </div>
    </TranslucentBorderContainer>
  );
};

export default AdminControls;
