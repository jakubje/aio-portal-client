import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Error from '../Error';
import Loader from '../Loader';
import { registerUser } from '../../slices/authActions';

const Register = () => {
  const [customError, setCustomError] = useState(null);

  const { loading, user, error, success } = useSelector((state) => state.auth);
  console.log(user);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    // redirect authenticated user to profile screen
    if (user) navigate('/portfolio');
    // redirect user to login page if registration was successful
    if (success) navigate('/login');
  }, [navigate, user, success]);

  const submitForm = (data) => {
    // check if passwords match
    if (data.password !== data.confirmPassword) {
      setCustomError('Password mismatch');
      return;
    }
    // transform email string to lowercase to avoid case sensitivity issues in login
    data.email = data.email.toLowerCase();

    dispatch(registerUser(data));
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {error && <Error>{error}</Error>}
      {customError && <Error>{customError}</Error>}
      <div className="form-group">
        <label htmlFor="name">First Name</label>
        <input
          type="text"
          className="form-input"
          {...register('name')}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          className="form-input"
          {...register('last_name')}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-input"
          {...register('email')}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-input"
          {...register('password')}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Confirm Password</label>
        <input
          type="password"
          className="form-input"
          {...register('confirmPassword')}
          required
        />
      </div>
      <button
        type="submit"
        className="button"
        disabled={loading}
      >
        {loading ? <Loader /> : 'Register'}
      </button>
    </form>
  );
};

export default Register;
