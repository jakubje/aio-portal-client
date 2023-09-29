import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import millify from 'millify';
import { Card, Row, Col, Input } from 'antd';
import { RiseOutlined, FallOutlined } from '@ant-design/icons';
import { useListCoinsQuery } from '../../services/cryptoApi';
import Loader from '../Loader';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;

  const { data: cryptoList, isFetching } = useListCoinsQuery(count);

  // const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filteredData = cryptoList?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setCryptos(filteredData);
  }, [cryptoList, searchTerm]);

  if (isFetching) return <Loader />;
  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptos"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
      )}
      <Row
        gutter={[32, 32]}
        className="crypto-card-container"
      >
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.coin_uuid}
          >
            <Link to={`/crypto/${currency.coin_id}/${currency.coin_uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={
                  <img
                    className="crypto-image"
                    alt={`${currency.name}`}
                    src={currency.image_url}
                  />
                }
                hoverable="true"
                // style={millify(currency.change) < 0 ? { backgroundColor: 'red' } : { backgroundColor: 'green' }}
              >
                <div className="crypto-details">
                  <p>Price: {millify(currency.price)}</p>
                  <p>Market Cap: {millify(currency.market_cap)}</p>
                  <p>Daily Change: {millify(currency.daily_change)}%</p>
                  {millify(currency.daily_change) < 0 ? (
                    <FallOutlined
                      className="crypto-change-symbol"
                      style={{ color: 'red' }}
                      size="large"
                    />
                  ) : (
                    <RiseOutlined
                      className="crypto-change-symbol"
                      style={{ color: 'green' }}
                      size="large"
                    />
                  )}
                </div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
