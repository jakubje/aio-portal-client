import React from 'react';
import { useGetPortfolioRollUpQuery } from '../../services/cryptoApi';
import { Card, Row, Col, Input } from 'antd';
import millify from 'millify';
import Error from '../Error';
import Loader from '../Loader';

const IndividualPortfolio = ({ portfolioID }) => {
  const { data, isLoading, isError } = useGetPortfolioRollUpQuery(portfolioID, { skip: !portfolioID });

  const portfolioData = data?.summary || {};
  if (isLoading) return <Loader />;
  if (isError) return <Error>{isError}</Error>;

  if (data === undefined) {
    return (
      <div>
        <p>No data</p>
      </div>
    );
  } else {
    return (
      <>
        <Row
          gutter={[32, 32]}
          className="portfolio-card-container"
        >
          {portfolioData?.map((data) => (
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
                <div className="portfolio-details">
                  <p>Total Holdings: {data.total_coins}</p>
                  <p>Total Cost: ${data.total_cost}</p>
                  <p>Price per coin: ${data.price_per_coin}</p>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </>
    );
  }
};

export default IndividualPortfolio;
