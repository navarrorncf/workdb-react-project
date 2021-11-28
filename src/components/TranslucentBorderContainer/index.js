import './styles.css';

const TranslucentBorderContainer = ({ children }) => (
  <div className="outer-container">
    <div className="inner-container">{children}</div>
  </div>
);

export default TranslucentBorderContainer;
