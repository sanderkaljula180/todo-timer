import * as actionTypes from './tasks.actionTypes';


const initialState = {
    loading: false,
    activeTasks: [],
    archivedTasks: [],
    error: null,
    activatedTask: {
      taskID: null,
      pomodoroTime: null,
      shortBreakTime: null,
      longBreakTime: null,
      pomodorosDone: null,
      shortBreaksDone: null,
      longBreaksDone: null,
    }
};

export const taskReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.TASKS_FETCH_REQUEST:
        return { ...state, loading: true };
      case actionTypes.TASKS_FETCH_SUCCESS:
        return { ...state, loading: false, activeTasks: action.activeData, archivedTasks: action.archivedData };
      case actionTypes.TASKS_FETCH_FAIL:
        return { ...state, loading: false, error: action.error };
      case actionTypes.CREATE_NEW_TASK:
        return { ...state, loading: true };
      case actionTypes.CREATE_NEW_TASK_SUCCESS:
        return { ...state, loading: false };
      case actionTypes.CREATE_NEW_TASK_FAIL:
        return { ...state, loading: false, error: action.err };
      case actionTypes.ARCHIVE_TASK:
        return { ...state, loading: true };
      case actionTypes.ARCHIVE_TASK_SUCCESS:
        return { ...state, loading: false };
      case actionTypes.ARCHIVE_TASK_FAIL:
        return { ...state, loading: false, error: action.err };
      case actionTypes.UNARCHIVE_TASK:
        return { ...state, loading: true };
      case actionTypes.UNARCHIVE_TASK_SUCCESS:
        return { ...state, loading: false };
      case actionTypes.UNARCHIVE_TASK_FAIL:
        return { ...state, loading: false, error: action.err };
      default:
        return state;
    }
}

export default taskReducer;
