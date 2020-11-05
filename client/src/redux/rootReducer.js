import { combineReducers } from 'redux';

import projectsReducer from './projects/projects.reducer';
import taskReducer from './tasks/tasks.reducer';
import timerReducer from './timer/timer.reducer';

export default combineReducers({
  projectsReducer: projectsReducer,
  tasksReducer: taskReducer,
  timerReducer: timerReducer
});