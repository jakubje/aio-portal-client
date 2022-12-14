import React from 'react';
import { Col, Row, Typography } from 'antd';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);
const { Title } = Typography;
const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp * 1000).toLocaleDateString());
  }

  const data = {
    labels: coinTimestamp.reverse(),
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice.reverse(),
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const styleColour = coinHistory?.data?.change < 0 ? { color: 'red' } : { color: 'green' };

  const options = {};
  return (
    <>
      <Row className="chart-header">
        <Title
          level={2}
          className="chart-title"
        >
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title
            level={5}
            className="price-change"
            style={styleColour}
          >
            Change: {coinHistory?.data?.change}%
          </Title>
          <Title
            level={5}
            className="current-price"
          >
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line
        data={data}
        options={options}
      />
    </>
  );
};

export default LineChart;
