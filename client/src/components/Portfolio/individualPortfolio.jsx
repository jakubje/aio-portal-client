import React from 'react';
import { useGetPortfolioRollUpQuery } from '../../services/cryptoApi';
import { Card, Row, Col, Input } from 'antd';
import millify from 'millify';
import Error from '../Error';
import Loader from '../Loader';
import Transaction from '../Transaction';
import { useSelector } from 'react-redux';

const IndividualPortfolio = () => {
  const portfolioID = useSelector((state) => state.userInfo.portfolioId);
  console.log(portfolioID);
  const { data, isLoading, isError } = useGetPortfolioRollUpQuery(portfolioID, { skip: !portfolioID });
  console.log(data);
  const portfolioData = data?.summary;

  console.log(portfolioData);
  if (isLoading) return <Loader />;
  if (isError) return <Error>{isError}</Error>;

  if (!portfolioData) {
    return (
      <div>
        <p>No data</p>
      </div>
    );
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Token Balance</th>
            <th>Total Cost</th>
            <th>Price per Coin</th>
            <th>Profit/Loss</th>
            <th>Current value</th>
          </tr>
        </thead>
        <tbody>
          {portfolioData.map((item, index) => (
            <tr key={index}>
              <td>{item.symbol}</td>
              <td>{item.total_coins}</td>
              <td>{item.total_cost}</td>
              <td>{item.price_per_coin}</td>
              <td>{item.profit_loss_percentage}</td>
              <td>{item.current_value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <Row
        gutter={[32, 32]}
        className="portfolio-card-container"
      >
        {portfolioData.map((data) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="portfolio-card"
            key={data.symbol}
          >
            <Card
              title={`${data.symbol}`}
              hoverable="true"
              // style={millify(currency.change) < 0 ? { backgroundColor: 'red' } : { backgroundColor: 'green' }}
            >
              {data.total_cost < 0 ? (
                <div className="portfolio-details">
                  <p>Profit: ${data.total_cost.toString().substring(1)}</p>
                </div>
              ) : (
                <div className="portfolio-details">
                  <p>Total Holdings: {data.total_coins}</p>
                  <p>Total Cost: ${data.total_cost}</p>
                  <p>Price per coin: ${data.price_per_coin}</p>
                </div>
              )}
            </Card>
          </Col>
        ))}
      </Row> */}
    </>
  );
};

export default IndividualPortfolio;
