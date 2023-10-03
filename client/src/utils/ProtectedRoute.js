import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
  console.log(user);
  let location = useLocation();

  useEffect(() => {
    if (user) {
      navigate('/login');
    }
  }, [navigate, user]);

  // if (!user) {
  //   navigate('/login');
  //   // <Navigate
  //   //   to="/login"
  //   //   state={{ from: location }}
  //   //   replace
  //   // />;
  // }
  return children;
};

export default ProtectedRoute;
