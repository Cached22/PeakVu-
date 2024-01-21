import {
  PROJECT_CREATED,
  PROJECTS_FETCH_SUCCESS,
  PROJECT_FETCH_SUCCESS,
  PROJECT_UPDATE_SUCCESS,
  PROJECT_DELETE_SUCCESS
} from '../actions/projectActions';

const initialState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROJECT_CREATED:
      return {
        ...state,
        projects: [...state.projects, action.payload],
        loading: false,
        error: null
      };
    case PROJECTS_FETCH_SUCCESS:
      return {
        ...state,
        projects: action.payload,
        loading: false,
        error: null
      };
    case PROJECT_FETCH_SUCCESS:
      return {
        ...state,
        currentProject: action.payload,
        loading: false,
        error: null
      };
    case PROJECT_UPDATE_SUCCESS:
      return {
        ...state,
        projects: state.projects.map(project =>
          project._id === action.payload._id ? action.payload : project
        ),
        loading: false,
        error: null
      };
    case PROJECT_DELETE_SUCCESS:
      return {
        ...state,
        projects: state.projects.filter(project => project._id !== action.payload),
        loading: false,
        error: null
      };
    default:
      return state;
  }
};

export default projectReducer;