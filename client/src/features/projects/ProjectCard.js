import React from 'react';
import './projects.scss';


const ProjectCard = (props) => (
  <div className="ProjectCard">
      <div className="ProjectName">
        <p> {props.name} </p>
      </div>
      <div className="ProjectOverview">
        <p>Tasks: 4</p>
        <p>Tasks Done: 2</p>
      </div>
      <div className="ProjectActions">
        <p onClick={props.activateProject}>SELECT PROJECT</p>
        <p onClick={props.deleteProject}>Prügi</p>
      </div>
  </div>
)

export default ProjectCard;