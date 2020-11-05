import React from 'react';
import './ui.scss';


const AddButton = (props) => (
    <div className="AddButton" onClick={props.addItem}>
        <img src="" />
        <p>{props.btnTitle}</p>
    </div>
)

export default AddButton;