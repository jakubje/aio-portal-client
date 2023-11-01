import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../slices/authSlice';
import Summary from './summary';
import Transaction from '../Transaction';
import CustomTable from '../CustomTable';
import { Button } from 'antd';

const Portfolio = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // console.log(user);

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
        <Button
          className="button"
          onClick={() => dispatch(logout())}
        >
          Logout
        </Button>
        <Summary />
        <Transaction />
        <CustomTable />
      </div>
    );
  }
};

export default Portfolio;
