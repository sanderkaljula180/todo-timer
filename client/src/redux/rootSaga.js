import { all, call } from 'redux-saga/effects';

import { projectsWatcherSaga } from './projects/projects.saga';
import { tasksWatcherSaga } from './tasks/tasks.saga';
import { timerWatcherSaga } from './timer/timer.saga';

export default function* rootSaga() {
  yield all([
    call(projectsWatcherSaga),
    call(tasksWatcherSaga),
    call(timerWatcherSaga)
  ])
}