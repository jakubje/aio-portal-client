import React, { useState } from 'react';
import { useCreatePortfolioMutation, useListPortfoliosQuery } from '../../services/cryptoApi';
import { useForm } from 'react-hook-form';
import Error from '../Error';
import Loader from '../Loader';
import IndividualPortfolio from './individualPortfolio';

const Summary = () => {
  const [portfolioName, setPortfolioName] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

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
        <option value="">Select an option</option>
        {portfolios.map((portfolio) => (
          <option
            key={portfolio.id}
            value={portfolio.id}
          >
            {portfolio.name}
          </option>
        ))}
      </select>

      <IndividualPortfolio portfolioID={selectedOption} />
    </div>
  );
};

export default Summary;
