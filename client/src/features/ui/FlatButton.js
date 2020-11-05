import React from 'react';
import './ui.scss';

//onClick={props.addItem}

const FlatButton = (props) => (
    <div className={`${ props.activeOption }`} onClick={props.setActive} >
        <p>{props.btnValue}</p>
    </div>
)

export default FlatButton;