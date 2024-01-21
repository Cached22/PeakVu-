import { AsyncStorage } from 'react-native';
import { AUTH_SUCCESS, AUTH_FAILURE } from '../utils/actionTypes';
import authApi from '../api/authApi';

export const login = (email, password) => async dispatch => {
  try {
    const response = await authApi.post('/login', { email, password });
    const { token } = response.data;
    await AsyncStorage.setItem('jwtToken', token);
    dispatch({ type: AUTH_SUCCESS, payload: token });
  } catch (error) {
    dispatch({
      type: AUTH_FAILURE,
      payload: error.response ? error.response.data : 'Network Error'
    });
  }
};

export const logout = () => async dispatch => {
  await AsyncStorage.removeItem('jwtToken');
  dispatch({ type: AUTH_SUCCESS, payload: null });
};