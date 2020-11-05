import { takeLatest, call, put } from "redux-saga/effects";
import 'firebase/firestore';

import { firestore } from '../../configuration/fbUtils';

export function* projectsWatcherSaga() {
    yield takeLatest("PROJECTS_FETCH_REQUEST", fetchWorkerSaga);
    yield takeLatest("CREATE_NEW_PROJECT", createWorkerSaga);
    yield takeLatest("DELETE_PROJECT", deleteWorkerSaga);
    yield takeLatest("ACTIVATE_PROJECT", activateProjectWorkerSaga);
}

// DEFO VAATA SEE ÜLE KAS SAAD REFAC TEHA JA KUI PROJEKTI POLE ANDMEBAASI ENAM AGA TA ON LOCALSTORAGE, SIIS KUSTUTA LOCALSTORAGE
export const activateProject = (payload) => {
  const { documentID, data } = payload;
  return new Promise((resolve, reject) => {
    if ( documentID !== undefined) {
      localStorage.setItem('activatedProject', documentID);
      const projectID = localStorage.getItem('activatedProject');
      resolve(projectID);
    } else if ( localStorage.getItem('activatedProject') !== undefined ) {
      const projectID = localStorage.getItem('activatedProject');
      

      const projectItems = [];
      data.forEach(item => {
       projectItems.push(item.documentID);
      })
      console.log("TEEB ÄRA")
      if (projectItems.includes(projectID)) {
        resolve(projectID);
        
      } else {
        localStorage.removeItem('activatedProject');
        resolve()
      }
    }
  })
}

export const deleteProject = (projectID) => {
  return new Promise((resolve, reject) => {
    let ref = firestore.collection('projects');
    ref
      .doc(projectID)
      .delete()
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      })
  })
}

export const addProjects = () => {
  return new Promise((resolve, reject) => {
    let ref = firestore.collection('projects');
    ref
      .doc()
      .set({
        project_name: 'Project name here',
      })
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      })
  })
}

export const fetchProjects = () => {
  return new Promise((resolve, reject) => {
    let ref = firestore.collection('projects');
    ref
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
  });
}

function* activateProjectWorkerSaga(payload) {
  try {
    const projectID = yield call(activateProject, payload);
    yield put({ type: "ACTIVATE_PROJECT_SUCCESS", projectID });
    yield put({ type: "TASKS_FETCH_REQUEST", projectID })
  } catch (err) {
    yield put({ type: "ACTIVATE_PROJECT_FAIL", err });
  }
}

function* deleteWorkerSaga(payload) {
  try {
    const { projectID } = payload
    yield call(deleteProject, projectID);
    // dispatch a success action to the store with the new dog
    yield put({ type: "DELETE_PROJECT_SUCCESS" });
    yield put({ type: "DELETE_TASK", projectID });
    yield put({ type: "PROJECTS_FETCH_REQUEST" });
  
  } catch (err) {
    // dispatch a failure action to the store with the error
    yield put({ type: "DELETE_PROJECT_FAIL", err });
  }
}

function* createWorkerSaga() {
  try {
    yield call(addProjects);
    // dispatch a success action to the store with the new dog
    yield put({ type: "CREATE_NEW_PROJECT_SUCCESS" });
    yield put({ type: "PROJECTS_FETCH_REQUEST" });
  
  } catch (err) {
    // dispatch a failure action to the store with the error
    yield put({ type: "CREATE_NEW_PROJECT_FAIL", err });
  }
}

// worker saga: makes the api call when watcher saga sees the action
function* fetchWorkerSaga() {
  try {
    const response = yield call(fetchProjects);
    const data = response.data;

    // dispatch a success action to the store with the new dog
    yield put({ type: "PROJECTS_FETCH_SUCCESS", data });
    yield put({ type: "ACTIVATE_PROJECT", data });
  } catch (err) {
    // dispatch a failure action to the store with the error
    yield put({ type: "PROJECTS_FETCH_FAIL", err });
  }
}