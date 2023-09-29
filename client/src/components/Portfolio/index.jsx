import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice';

const Portfolio = () => {
  const dispatch = useDispatch();
  return (
    <div>
      Portfolio
      <button
        className="button"
        onClick={() => dispatch(logout())}
      >
        Logout
      </button>
    </div>
  );
};

export default Portfolio;
