import moment from 'moment';
import { fetchRefreshToken } from '../slices/authActions';
import { logout } from '../slices/authSlice';
import jwt_decode from 'jwt-decode';

const refreshMiddleware = ({ dispatch, getState }) => {
  return (next) => (action) => {
    if (typeof action === 'function') {
      const access_token = getState().auth.access_token;
      if (access_token) {
        const decoded = jwt_decode(access_token, { header: true });
        // const decoded = 'test';
        if (decoded.expired_at && decoded.expired_at - moment().unix() < 10) {
          const isStillRefreshing = getState().auth.refresh_token;
          if (!isStillRefreshing) {
            dispatch(fetchRefreshToken(access_token))
              .then(() => {
                return next(action);
              })
              .catch((error) => {
                return dispatch(logout());
              });
          }
        }
      }
    }
    return next(action);
  };
};

export default refreshMiddleware;
