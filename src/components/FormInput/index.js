import moment from 'moment';
import 'moment/locale/pt-br';

import Datetime from 'react-datetime';

import 'react-datetime/css/react-datetime.css';
import './styles.css';

const TODAY = moment();

const FormInput = ({
  name,
  type,
  label,
  id,
  onChange,
  value,
  placeholder,
  errorMessage,
}) => {
  return type === 'date' ? (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <Datetime
        initialViewMode="years"
        timeFormat={false}
        closeOnSelect={true}
        inputProps={{ placeholder, readOnly: true }}
        isValidDate={(current) => current.isBefore(TODAY)}
        onChange={onChange}
        value={value}
        renderInput={(props) => (
          <input {...props} value={value ? props.value : ''} />
        )}
      />
      <p className="error-message">{errorMessage}</p>
    </div>
  ) : (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <p className="error-message">{errorMessage}</p>
    </div>
  );
};

export default FormInput;
