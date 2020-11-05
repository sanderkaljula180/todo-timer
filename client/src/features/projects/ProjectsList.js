import React from 'react';
import './projects.scss';

import { useDispatch, useSelector, shallowEqual } from "react-redux";

import ProjectCard from './ProjectCard';



const ProjectsList = () => {

  const dispatch = useDispatch();

  const { projects } = useSelector(state => ({
    projects: state.projectsReducer.data,
  }), shallowEqual);

  return (
    <div className="ProjectsList">
      {
        projects.map(item => 
          <ProjectCard 
            key={item.documentID} 
            name={item.project_name}
            activateProject={() => dispatch({ type: 'ACTIVATE_PROJECT', documentID: item.documentID })}
            deleteProject={() => dispatch({ type: 'DELETE_PROJECT', projectID: item.documentID })} />
        )
      }
    </div>
  );
}

export default ProjectsList;