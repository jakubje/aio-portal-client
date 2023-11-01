import React, { useState } from 'react';
import { useCreatePortfolioMutation, useListPortfoliosQuery } from '../../services/cryptoApi';
import { useForm } from 'react-hook-form';
import Error from '../Error';
import Loader from '../Loader';
import { useDispatch, useSelector } from 'react-redux';
import { updatePortfolioId } from '../../slices/userInfoSlice';
import { Button, Dropdown, Select, Space, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const Summary = () => {
  const dispatch = useDispatch();
  const [portfolioName, setPortfolioName] = useState('');
  const portfolioID = useSelector((state) => state.userInfo.portfolioId);

  const { register, handleSubmit } = useForm();

  const { data, isFetching, isError } = useListPortfoliosQuery();
  const [createPortfolio, { isLoading, error }] = useCreatePortfolioMutation();

  const portfolios = data?.portfolios || [];

  const selectItems = portfolios.map((portfolio) => {
    return {
      label: portfolio.name,
      value: portfolio.id,
    };
  });

  const submitForm = async () => {
    try {
      await createPortfolio(portfolioName);
    } catch (e) {
      console.log(e);
    }
  };

  const onChange = (value) => {
    dispatch(updatePortfolioId(value));
  };

  const onSearch = (value) => {
    console.log('search:', value);
  };

  const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  if (isFetching) return <Loader />;
  if (isError) return <Error>{isError}</Error>;

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(submitForm)}>
          {error && <Error>{error}</Error>}
          <div className="form-group">
            <label htmlFor="portfolioName">Portfolio</label>
            <input
              type="portfolio"
              className="form-input"
              {...register('portfolio')}
              required
              onChange={(e) => setPortfolioName(e.currentTarget.value)}
            />
          </div>
          <Button
            type="submit"
            className="button"
            disabled={isLoading}
          >
            {isLoading ? <Loader /> : 'Create Portfolio'}
          </Button>
        </form>

        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select portfolio"
          defaultValue={portfolioID}
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={filterOption}
          options={selectItems}
        />
      </div>
    </>
  );
};

export default Summary;
