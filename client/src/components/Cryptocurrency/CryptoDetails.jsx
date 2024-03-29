import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { v1 as uuidv1 } from 'uuid';
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import { useGetCryptoHistoryQuery } from '../../services/cryptoApi';
import { useGetCoinDetailsQuery } from '../../services/cryptoApi';
import LineChart from '../LineChart';
import Loader from '../Loader';

const { Title, Text } = Typography;
const { Option } = Select;

const CrpytoDetails = () => {
  const { coinId, coinUUID } = useParams();
  const [timePeriod, setTimePeriod] = useState('7d');
  const [activeInfo, setActiveInfo] = useState(false);
  const { data, isFetching } = useGetCoinDetailsQuery(coinId);

  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinUUID, timePeriod });

  if (isFetching) return <Loader />;
  const cryptoDetails = data?.coin;

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.market_cap && millify(cryptoDetails?.market_cap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.all_time_high && millify(cryptoDetails?.all_time_high)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.number_of_markets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.number_of_exchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.approved_supply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.total_supply && millify(cryptoDetails?.total_supply)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.circulating_supply && millify(cryptoDetails?.circulating_supply)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title
          level={2}
          className="coin-name"
        >
          {cryptoDetails.name} ({cryptoDetails.coin_id}) Price
        </Title>
        <p>{cryptoDetails.name} live price in US dollars. View value statistics, market cap and supply</p>
      </Col>
      <Select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="Select Time Period"
        onChange={(value) => {
          setTimePeriod(value);
        }}
      >
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>
      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails.price)}
        coinName={cryptoDetails.name}
      />
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title
              level={3}
              className="coin-details-heading"
            >
              {cryptoDetails.name} Value Statistics
            </Title>
            <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col
              className="coin-stats"
              key={title}
            >
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title
              level={3}
              className="coin-details-heading"
            >
              Other Statistics
            </Title>
            <p>An overview showing the statistics of all cryptocurrencies</p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col
              className="coin-stats"
              key={title}
            >
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Title
        level={3}
        className="coin-desc-show-more"
        onClick={() => setActiveInfo(!activeInfo)}
      >
        {!activeInfo ? 'Show more' : 'Show less'}
      </Title>
      {activeInfo && (
        <Col className="coin-desc-link">
          <Row className="coin-desc">
            <Title
              level={3}
              className="coin-details-heading"
            >
              What is {cryptoDetails.name} ?
            </Title>
            {HTMLReactParser(cryptoDetails.description)}
          </Row>
          <Col className="coin-links">
            <Title
              level={3}
              className="coin-details-heading"
            >
              {cryptoDetails.name} Links
            </Title>
            {cryptoDetails.social_media_links.map((link) => (
              <Row
                className="coin-link"
                key={`${uuidv1()}-${link.name}`}
              >
                {' '}
                <Title
                  level={5}
                  className="link-name"
                >
                  {/* {link.type} */}
                </Title>
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.replace(/^(https?:\/\/)?(www\.)?/i, '')}
                </a>
              </Row>
            ))}
          </Col>
        </Col>
      )}
    </Col>
  );
};

export default CrpytoDetails;
