import React, { useState } from 'react';
import { useCreatePortfolioMutation, useListPortfoliosQuery } from '../../services/cryptoApi';
import { useForm } from 'react-hook-form';
import Error from '../Error';
import Loader from '../Loader';
import IndividualPortfolio from './individualPortfolio';
import Transaction from '../Transaction';
import { useDispatch, useSelector } from 'react-redux';
import { updatePortfolioId } from '../../slices/userInfoSlice';
import useSelection from 'antd/lib/table/hooks/useSelection';

const Summary = () => {
  const dispatch = useDispatch();
  const portfolioID = useSelector((state) => state.userInfo.portfolioId);
  const [portfolioName, setPortfolioName] = useState('');
  const [selectedOption, setSelectedOption] = useState(portfolioID);

  const { register, handleSubmit } = useForm();

  const { data, isFetching, isError } = useListPortfoliosQuery();
  const [createPortfolio, { isLoading, error }] = useCreatePortfolioMutation();

  const portfolios = data?.portfolios || [];

  if (isFetching) return <Loader />;
  if (isError) return <Error>{isError}</Error>;

  const submitForm = async () => {
    try {
      await createPortfolio(portfolioName);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);

    dispatch(updatePortfolioId(event.target.value));
  };

  return (
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

        <button
          type="submit"
          className="button"
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : 'Create Portfolio'}
        </button>
      </form>

      <select
        value={selectedOption}
        onChange={handleSelectChange}
      >
        {portfolios.map((portfolio) => (
          <option
            key={portfolio.id}
            value={portfolio.id}
          >
            {portfolio.name}
          </option>
        ))}
      </select>

      <Transaction />
      <IndividualPortfolio />
    </div>
  );
};

export default Summary;
