import React, { useState } from 'react';
import { useGetPortfolioRollUpQuery } from '../../services/cryptoApi';
import Error from '../Error';
import Loader from '../Loader';
import { useSelector } from 'react-redux';
import { Button, Table } from 'antd';

const CustomTable = () => {
  const portfolioID = useSelector((state) => state.userInfo.portfolioId);
  const { data, isLoading, isError } = useGetPortfolioRollUpQuery(portfolioID, { skip: !portfolioID });
  const portfolioData = data?.summary || [];

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const filters = portfolioData.map((item) => {
    return {
      text: item.symbol,
      value: item.symbol,
    };
  });
  const columns = [
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      filters: filters,
      filterMode: 'tree',
      filteredValue: filteredInfo.symbol || null,
      onFilter: (value, record) => record.symbol.includes(value),
      width: '30%',
      ellipsis: true,
    },
    {
      title: 'Token Balance',
      dataIndex: 'total_coins',
      key: 'total_coins',
      sorter: (a, b) => a.total_coins - b.total_coins,
      sortOrder: sortedInfo.columnKey === 'total_coins' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Total Cost',
      dataIndex: 'total_cost',
      key: 'total_cost',
      sorter: (a, b) => a.total_cost - b.total_cost,
      sortOrder: sortedInfo.columnKey === 'total_cost' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Average price',
      dataIndex: 'price_per_coin',
      key: 'price_per_coin',
      sorter: (a, b) => a.price_per_coin - b.price_per_coin,
      sortOrder: sortedInfo.columnKey === 'price_per_coin' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Percentage change',
      dataIndex: 'profit_loss_percentage',
      key: 'profit_loss_percentage',
      sorter: (a, b) => a.profit_loss_percentage - b.profit_loss_percentage,
      sortOrder: sortedInfo.columnKey === 'profit_loss_percentage' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Current value',
      dataIndex: 'current_value',
      key: 'current_value',
      sorter: (a, b) => a.current_value - b.current_value,
      sortOrder: sortedInfo.columnKey === 'current_value' ? sortedInfo.order : null,
      ellipsis: true,
    },
  ];

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
      <Button onClick={clearFilters}>Clear filters</Button>
      <Button onClick={clearAll}>Clear filters and sorters</Button>
      <Table
        columns={columns}
        dataSource={portfolioData}
        onChange={handleChange}
      />
    </>
  );
};

export default CustomTable;
