import { takeLatest, call, put } from "redux-saga/effects";
import 'firebase/firestore';

import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { firestore } from '../../configuration/fbUtils';



export function* timerWatcherSaga() {
    yield takeLatest("START_TIMER", startTimerWorkerSaga);
    yield takeLatest("CHANGE_TIMER", changeTimerWorkerSaga);
    yield takeLatest("CHANGE_POMODORO_TIME", changePomodoroTimeWorkerSaga);
    yield takeLatest("CHANGE_SHORT_BREAK_TIME", changeShortBreakTimeWorkerSaga);
    yield takeLatest("CHANGE_LONG_BREAK_TIME", changeLongBreakTimeWorkerSaga);
}

const startTimer = (payload) => {
    
    const { seconds } = payload;

    console.log(seconds)

  /*  const secondsInterval = setInterval(() => {
        setSeconds((prevProgress) => (prevProgress <= 0 ? 600 : prevProgress - 1));
      }, 1000);
      return () => {
        //clearInterval(minutesInterval);
        clearInterval(secondsInterval);
    };*/
}


function* changeTimerWorkerSaga(payload) {
  try {
    const { option, activeOption } = payload;
    if (option !== activeOption ) {
      let newOption = option;
      yield put({ type: "CHANGE_TIMER_SUCCESS", newOption });
    }
  } catch (error) {
    // dispatch a failure action to the store with the error
   // yield put({ type: "TASKS_FETCH_FAIL", error });
  }
}

function* changePomodoroTimeWorkerSaga(payload) {
  try {
    const { value } = payload;
    yield put({ type: "CHANGE_POMODORO_TIME_SUCCESS", value });
  } catch (error) {
    // dispatch a failure action to the store with the error
   // yield put({ type: "TASKS_FETCH_FAIL", error });
  }
}

function* changeShortBreakTimeWorkerSaga(payload) {
  try {
    const { value } = payload;
    yield put({ type: "CHANGE_SHORT_BREAK_TIME_SUCCESS", value });
  } catch (error) {
    // dispatch a failure action to the store with the error
   // yield put({ type: "TASKS_FETCH_FAIL", error });
  }
}

function* changeLongBreakTimeWorkerSaga(payload) {
  try {
    const { value } = payload;
    yield put({ type: "CHANGE_LONG_BREAK_TIME_SUCCESS", value });
  } catch (error) {
    // dispatch a failure action to the store with the error
   // yield put({ type: "TASKS_FETCH_FAIL", error });
  }
}


function* startTimerWorkerSaga(payload) {
    try {
        
        //yield put({ type: "CHANGE_TIMER_SUCCESS", response });
    
    } catch (error) {
      // dispatch a failure action to the store with the error
     // yield put({ type: "TASKS_FETCH_FAIL", error });
    }
  }