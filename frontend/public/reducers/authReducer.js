import { AUTH_SUCCESS } from '../actions/authActions';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null
      };
    // Add other case handlers for different types of authentication actions
    default:
      return state;
  }
};

export default authReducer;