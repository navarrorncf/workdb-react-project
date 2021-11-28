import './styles.css';

const Button = ({ onClick, color, title }) => (
  <button onClick={onClick} className={`btn ${color}`}>
    {title}
  </button>
);

export default Button;
