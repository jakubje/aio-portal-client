import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../slices/authActions';
import Error from '../Error';
import Loader from '../Loader';
import { logout } from '../../slices/authSlice';

const Login = () => {
  const { loading, user, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  // redirect authenticated user to profile screen
  useEffect(() => {
    if (user) {
      navigate('/portfolio');
    }
  }, [navigate, user]);

  const submitForm = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        {error && <Error>{error}</Error>}
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
        <button
          type="submit"
          className="button"
          disabled={loading}
        >
          {loading ? <Loader /> : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
