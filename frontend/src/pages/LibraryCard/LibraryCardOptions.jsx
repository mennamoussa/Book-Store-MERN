import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LibraryCardOptions.css';

const LibraryCardOptions = () => {
  const navigate = useNavigate();

  return (
    <div className="card-options-container">
      <h2>Manage Your Library Card</h2>
      <div className="options-grid">
        <button onClick={() => navigate('/library-card/renew')}>Renew Card</button>
        <button onClick={() => navigate('/library-card/lost')}>Report Lost Card</button>
        <button onClick={() => navigate('/library-card/new')}>Request New Card</button>
      </div>
    </div>
  );
};

export default LibraryCardOptions;
