import { AUTH_SUCCESS } from '../utils/authUtils';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: true,
  error: null
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null
      };
    // Add other case handlers for different types of authentication actions
    default:
      return state;
  }
}

export default authReducer;