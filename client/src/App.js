import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { Navbar, Football, Homepage, CryptoDetails, Cryptocurrencies, News, Portfolio, Login, Register } from './components';
import './App.css';
import { useSelector } from 'react-redux';
import ProtectedRoute from './utils/ProtectedRoute';

const App = () => {
  // const { user } = useSelector((state) => state.auth);

  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>

      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route
                path="/register"
                element={<Register />}
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/"
                element={<Homepage />}
              />
              <Route
                path="/football"
                element={<Football />}
              />
              <Route
                path="/cryptocurrencies"
                element={<Cryptocurrencies />}
              />
              <Route
                path="/crypto/:coinId/:coinUUID"
                element={<CryptoDetails />}
              />

              <Route
                path="/news"
                element={<News />}
              />
              <Route
                path="/portfolio"
                element={<Portfolio />}
              />
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: 'white', textAlign: 'center' }}
          >
            Copyright © 2021
            <Link to="/">Cryptoverse Inc.</Link> <br />
            All Rights Reserved.
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default App;
