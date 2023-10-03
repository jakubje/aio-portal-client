import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../slices/authSlice';
import Summary from './summary';

const Portfolio = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  if (!user) {
    return (
      <>
        You must log in to view this page <a href="/login">Login </a>
      </>
    );
  } else {
    return (
      <div>
        Welcome {user.name}
        <button
          className="button"
          onClick={() => dispatch(logout())}
        >
          Logout
        </button>
        <Summary />
      </div>
    );
  }
};

export default Portfolio;
