import React from 'react';
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import './tasks.scss';
import LargeHeader from '../ui/LargeHeader';
import TasksList from './TasksList';
import AddButton from '../ui/AddButton';


const Tasks = () => {

  const dispatch = useDispatch()

  const { projects } = useSelector(state => ({
    projects: state.projectsReducer.activatedProject,
  }), shallowEqual);

  return (
    <div className="Section Tasks">
      {
        projects ? 
        <div>
          <LargeHeader title="Tasks" />
          <TasksList />
          <AddButton btnTitle="Add Task" addItem={() => dispatch({ type: 'CREATE_NEW_TASK', documentID: projects })}/>
        </div>
        : 
        <div>
          <h3>Please select your project</h3>
          <button>SELECT PROJECT</button>
        </div>
      }
    </div>
  ); 
}

export default Tasks;