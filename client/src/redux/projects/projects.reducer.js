import * as actionTypes from './projects.actionTypes';


const initialState = {
    loading: false,
    data: [],
    error: null,
    activatedProject: null,
};


export const projectsReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.PROJECTS_FETCH_REQUEST:
        return { ...state, loading: true };
      case actionTypes.PROJECTS_FETCH_SUCCESS:
        return { ...state, loading: false, data: action.data };
      case actionTypes.PROJECTS_FETCH_FAIL:
        return { ...state, loading: false, error: action.err };
      case actionTypes.CREATE_NEW_PROJECT:
        return { ...state, loading: true };
      case actionTypes.CREATE_NEW_PROJECT_SUCCESS:
        return { ...state, loading: false };
      case actionTypes.CREATE_NEW_PROJECT_FAIL:
        return { ...state, loading: false, error: action.err };
      case actionTypes.ACTIVATE_PROJECT:
        return { ...state, loading: true };
      case actionTypes.ACTIVATE_PROJECT_SUCCESS:
        return { ...state, loading: false, activatedProject: action.projectID };
      case actionTypes.ACTIVATE_PROJECT_FAIL:
        return { ...state, loading: false, error: action.err };
      default:
        return state;
    }
}

export default projectsReducer;