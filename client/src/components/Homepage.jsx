import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Cryptocurrencies, News, Loader } from './';
const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;
  if (isFetching) return <Loader />;
  const { total24hVolume, totalCoins, totalExchanges, totalMarketCap, totalMarkets } = globalStats;
  console.log(data);
  return (
    <>
      <Title
        level={2}
        className="heading"
      >
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic
            title="Total Cryptocurrencies"
            value={totalCoins}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={millify(totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={millify(total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(totalMarkets)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title
          level={2}
          className="homne-title"
        >
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title
          level={3}
          className="show-more"
        >
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title
          level={2}
          className="homne-title"
        >
          Latest Crypto News
        </Title>
        <Title
          level={3}
          className="show-more"
        >
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
};

export default Homepage;
