import {
  PROJECT_CREATED,
  PROJECT_FETCHED,
  PROJECT_UPDATED,
  PROJECT_DELETED,
  PROJECT_ERROR
} from '../actions/types';

const initialState = {
  projects: [],
  currentProject: null,
  loading: true,
  error: {}
};

export default function projectReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PROJECT_CREATED:
      return {
        ...state,
        projects: [payload, ...state.projects],
        loading: false
      };
    case PROJECT_FETCHED:
      return {
        ...state,
        currentProject: payload,
        loading: false
      };
    case PROJECT_UPDATED:
      return {
        ...state,
        projects: state.projects.map(project =>
          project._id === payload._id ? payload : project
        ),
        loading: false
      };
    case PROJECT_DELETED:
      return {
        ...state,
        projects: state.projects.filter(project => project._id !== payload),
        loading: false
      };
    case PROJECT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}