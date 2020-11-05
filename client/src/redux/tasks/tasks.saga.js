import { takeLatest, call, put } from "redux-saga/effects";
import 'firebase/firestore';

import { firestore } from '../../configuration/fbUtils';

export function* tasksWatcherSaga() {
    yield takeLatest("TASKS_FETCH_REQUEST", fetchWorkerSaga);
    yield takeLatest("CREATE_NEW_TASK", createWorkerSaga);
    yield takeLatest("DELETE_TASK", deleteWorkerSaga);
    yield takeLatest("ARCHIVE_TASK", archiveWorkerSaga);
    yield takeLatest("UNARCHIVE_TASK", unArchiveWorkerSaga);
}

export const fetchTasks = (projectID) => {
  return new Promise((resolve, reject) => {
    if (projectID !== null) {
      let ref = firestore.collection('tasks');
      ref
      .where('project_id', '==', projectID)
      .get()
      .then(snapshot => {
        //const totalCount = snapshot.size;
        const data = [
          ...snapshot.docs.map(doc => {
            return {
              ...doc.data(),
              documentID: doc.id
            }
          })
        ];
        resolve({
          data 
        });
      })
      .catch(err => {
        reject(err);
      })  
    } else {
      resolve();
    }
  });
}

export const addTasks = (projectID) => {
  return new Promise((resolve, reject) => {
    let ref = firestore.collection('tasks');
    ref
      .doc()
      .set({
        task_name: 'Task name here',
        archived: false,
        pomodoroTime: "",
        shortBreakTime: "",
        longBreakTime: "",
        pomodorosDone: "",
        shortBreaksDone: "",
        longBreaksDone: "",
        project_id: projectID,
      })
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      })
  })
}



export const deleteTasks = (payload) => {
  const { documentID, projectID } = payload;
  console.log(payload);
  return new Promise((resolve, reject) => {
    let ref = firestore.collection('tasks');
    if (projectID !== undefined) {
        ref
          .where('project_id', '==', projectID)
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              doc.ref.delete();
            })
            resolve();
          })
          .catch(err => {
            reject(err);
          })
    } else {
        console.log(documentID);
        ref
          .doc(documentID)
          .delete()
          .then(() => {
            resolve();
          })
          .catch(err => {
            console.log("error");
            reject(err);
          })
    }
})
}

export const unArchiveTasks = (documentID) => {
  console.log(documentID);
  return new Promise((resolve, reject) => {
    let ref = firestore.collection('tasks');
    ref
      .doc(documentID)
      .update({
        archived: false,
      })
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      })
  })
}

export const archiveTasks = (documentID) => {
  console.log(documentID);
  return new Promise((resolve, reject) => {
    let ref = firestore.collection('tasks');
    ref
      .doc(documentID)
      .update({
        archived: true,
      })
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      })
  })
}

function* createWorkerSaga(payload) {
  try {
    const { documentID } = payload
    yield call(addTasks, documentID);
    // dispatch a success action to the store with the new dog
    yield put({ type: "CREATE_NEW_TASK_SUCCESS" });
    yield put({ type: "PROJECTS_FETCH_REQUEST" });
  
  } catch (err) {
    // dispatch a failure action to the store with the error
    yield put({ type: "CREATE_NEW_TASK_FAIL", err });
  }
}

function* deleteWorkerSaga(payload) {
  try {
    //const { documentID, projectID } = payload
    yield call(deleteTasks, payload);
    // dispatch a success action to the store with the new dog
    yield put({ type: "DELETE_TASK_SUCCESS" });
    yield put({ type: "PROJECTS_FETCH_REQUEST" });
  
  } catch (err) {
    // dispatch a failure action to the store with the error
    yield put({ type: "DELETE_TASK_FAIL", err });
  }
}

function* unArchiveWorkerSaga(payload) {
  try {
    const { documentID } = payload
    yield call(unArchiveTasks, documentID);
    // dispatch a success action to the store with the new dog
    yield put({ type: "UNARCHIVE_TASK_SUCCESS" });
    yield put({ type: "PROJECTS_FETCH_REQUEST" });
  
  } catch (err) {
    // dispatch a failure action to the store with the error
    yield put({ type: "UNARCHIVE_TASK_FAIL", err });
  }
}

function* archiveWorkerSaga(payload) {
  try {
    const { documentID } = payload
    yield call(archiveTasks, documentID);
    // dispatch a success action to the store with the new dog
    yield put({ type: "ARCHIVE_TASK_SUCCESS" });
    yield put({ type: "PROJECTS_FETCH_REQUEST" });
  
  } catch (err) {
    // dispatch a failure action to the store with the error
    yield put({ type: "ARCHIVE_TASK_FAIL", err });
  }
}

// worker saga: makes the api call when watcher saga sees the action
function* fetchWorkerSaga(payload) {
  try {
    const { projectID } = payload;
    const response = yield call(fetchTasks, projectID);
    const data = response.data;
    const activeData = [];
    const archivedData = [];
    
    
    data.forEach(item => 
      item.archived ? archivedData.push(item) : activeData.push(item),
    );
    // dispatch a success action to the store with the new dog
    yield put({ type: "TASKS_FETCH_SUCCESS", activeData, archivedData });
  
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: "TASKS_FETCH_FAIL", error });
  }
}