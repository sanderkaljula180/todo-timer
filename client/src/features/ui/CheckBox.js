import React from 'react';
import './ui.scss';


const CheckBox = (props) => (
    <div className={`CheckBox ${ props.archivedClass }`} onClick={props.archiveTask} >
    </div>
)

export default CheckBox;