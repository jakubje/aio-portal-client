import React, { useCallback, useEffect, useState } from 'react';
import { useCreatePortfolioMutation, useCreateTransactionMutation, useListPortfoliosQuery } from '../../services/cryptoApi';
import { set, useForm } from 'react-hook-form';
import Error from '../Error';
import { useListCoinsQuery } from '../../services/cryptoApi';
import Loader from '../Loader';
import { useSelector } from 'react-redux';
import './index.css';
import { Button, Select } from 'antd';

const Transaction = () => {
  const portfolioID = useSelector((state) => state.userInfo.portfolioId);
  const [seen, setSeen] = useState(false);
  const [type, setType] = useState('buy');
  const [symbol, setSymbol] = useState('BTC');
  const [pricePerCoin, setPricePerCoin] = useState('');
  const [amount, setAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const { register, setValue, handleSubmit, reset, getValues } = useForm();

  const [createTransaction, { isLoading, isError, error }] = useCreateTransactionMutation();

  const { data, isFetching } = useListCoinsQuery(100);
  const cryptocurrencyData = data?.coins;

  const togglePop = () => {
    setSeen(!seen);
    console.log(getValues());
  };

  const submitForm = async (data) => {
    try {
      await createTransaction(data);
      reset({
        portfolio_id: portfolioID,
        symbol: symbol,
      });
      togglePop();
    } catch (e) {
      console.log(e);
    }
  };
  const handleTypeChange = (value) => {
    setType(value);
    if (value === 'buy') {
      setValue('type', 0);
    } else {
      setValue('type', 1);
    }
  };

  useEffect(() => {
    setValue('portfolio_id', portfolioID);
  }, [portfolioID]);

  useEffect(() => {
    if (!symbol) return;

    const pricePerCoin = cryptocurrencyData.find((crypto) => crypto.coin_id === symbol).price;
    setPricePerCoin(pricePerCoin);
    setValue('symbol', symbol);
  }, [symbol]);

  const handleAmountChange = (e) => {
    const amount = e.target.value;
    const quantity = amount / pricePerCoin;
    setQuantity(quantity);
    setAmount(amount);
    setValue('quantity', quantity);
    setValue('price_per_coin', pricePerCoin);
  };

  const handleQuantityChange = (e) => {
    const quantity = e.target.value;

    const amount = quantity * pricePerCoin;
    setQuantity(quantity);
    setAmount(amount);
    setValue('amount', amount);
    // setValue('price_per_coin', pricePerCoin);
  };

  const handleSymbolChange = (value) => {
    setSymbol(value);
  };

  const onSearch = (value) => {
    console.log('search:', value);
  };

  const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const cryptoItems = cryptocurrencyData.map((crypto) => {
    return {
      label: `(${crypto.coin_id}) ${crypto.name}`,
      value: crypto.coin_id,
    };
  });

  const typeItems = [
    {
      label: 'Buy',
      value: 'buy',
    },
    {
      label: 'Sell',
      value: 'sell',
    },
  ];

  if (isLoading) return <Loader />;
  if (isFetching) return <Loader />;
  if (isError) return <Error>{error}</Error>;

  return (
    <div>
      <Button onClick={togglePop}>Add Transaction</Button>
      {seen ? (
        <div className="popup">
          <div className="popup-inner">
            <form onSubmit={handleSubmit(submitForm)}>
              <button onClick={togglePop}>X</button>
              <div className="form-group">
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select portfolio"
                  defaultValue={symbol}
                  optionFilterProp="children"
                  onChange={handleSymbolChange}
                  onSearch={onSearch}
                  filterOption={filterOption}
                  options={cryptoItems}
                />
              </div>
              <div className="form-group">
                <label htmlFor="transaction">Type</label>

                <Select
                  showSearch
                  style={{ width: 100 }}
                  defaultValue={type}
                  onChange={handleTypeChange}
                  options={typeItems}
                />
              </div>

              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input
                  type="amount"
                  className="form-input"
                  {...register('amount')}
                  onChange={handleAmountChange}
                  placeholder="Enter amount"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="amount">Quantity</label>
                <input
                  type="quantity"
                  className="form-input"
                  {...register('quantity')}
                  onChange={handleQuantityChange}
                  placeholder="Enter quantity"
                  required
                />
              </div>

              <div className="form-group">
                <p>Price Per Coin: {pricePerCoin}</p>
              </div>
              <button
                type="submit"
                className="button"
                disabled={isLoading}
              >
                {isLoading ? <Loader /> : 'Create Transaction'}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Transaction;
