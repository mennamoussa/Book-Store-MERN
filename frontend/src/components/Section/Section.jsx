import './Section.css';
import { useNavigate } from 'react-router-dom';

const Section = ({ id, title, description, buttonText, navigateTo }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (navigateTo) navigate(navigateTo);
  };

  return (
    <section id={id} className="section">
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="section-content">
        <button onClick={handleClick}>{buttonText}</button>
      </div>
    </section>
  );
};

export default Section;
