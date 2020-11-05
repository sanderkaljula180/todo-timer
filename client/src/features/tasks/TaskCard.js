import React from 'react';
import './tasks.scss';
import Trash from '../../img/trash-2-32.ico';
import CheckBox from '../ui/CheckBox';
import { useDispatch } from "react-redux";


// TODO: Add pomodoro btn, Add checkbox

const TaskCard = (props) => {
  const dispatch = useDispatch();

  return (
    <div className="TaskCard">
      {
        props.isArchived ?
        <CheckBox archivedClass="ClosedCheckBox" archiveTask={() => dispatch({ type: 'UNARCHIVE_TASK', documentID: props.docID })} />
        :
        <CheckBox archiveTask={() => dispatch({ type: 'ARCHIVE_TASK', documentID: props.docID })} />
      }
      <div className="TaskName">
        <input value={props.name} />
      </div>
      <div className="Trash" onClick={props.deleteTask}>
        <img src={Trash} alt="Trash" />
      </div>
    </div>
  );

}

export default TaskCard;