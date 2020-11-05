import React, { useEffect, useState } from 'react';
import './tasks.scss';

import { useDispatch, useSelector, shallowEqual } from "react-redux";

import TasksCard from './TaskCard';


const TasksList = () => {

  const dispatch = useDispatch();



  const { tasks, archivedTasks } = useSelector(state => ({
    tasks: state.tasksReducer.activeTasks,
    archivedTasks: state.tasksReducer.archivedTasks,
  }), shallowEqual);



  return(
    <div className="TasksList">
      <div className="ActiveTasks">
        <p>Tasks: {tasks.length} </p>
        {
          tasks.map(item => 
            <TasksCard 
              isArchived={item.archived}
              key={item.documentID} 
              docID={item.documentID}
              name={item.task_name}
              deleteTask={() => dispatch({ type: 'DELETE_TASK', documentID: item.documentID })} />
          )
        }
      </div>
      <div className="ArchivedTasks">
        <p>Archive: {archivedTasks.length} </p>
        {
          archivedTasks.map(item => 
            <TasksCard 
              isArchived={item.archived}
              key={item.documentID} 
              docID={item.documentID}
              name={item.task_name}
              deleteTask={() => dispatch({ type: 'DELETE_TASK', documentID: item.documentID })} />
          )
        }
      </div>
    </div>
  )
}

export default TasksList;