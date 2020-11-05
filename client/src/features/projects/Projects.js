import React from 'react';
import './projects.scss';
import { useDispatch } from "react-redux";

import LargeHeader from '../ui/LargeHeader';
import ProjectsList from './ProjectsList';
import AddButton from '../ui/AddButton';

const Projects = () => {

  const dispatch = useDispatch()

  return (
    <div className="Section Projects">
      <LargeHeader title="Projects" />
      <ProjectsList />
      <AddButton btnTitle="Add Project" addItem={() => dispatch({ type: 'CREATE_NEW_PROJECT' })}/>
    </div>
  );
}

export default Projects;