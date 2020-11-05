import React, { useEffect } from 'react';
import './landing.scss';

import { useDispatch } from "react-redux";

import Separator from '../../features/separator/Separator';
import Timer from '../../features/timer/Timer';
import Projects from '../../features/projects/Projects';
import Tasks from '../../features/tasks/Tasks';


const Landing = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'PROJECTS_FETCH_REQUEST' });
  }, [])

  return (
    <div className="Landing">
      <Tasks />
      <Separator />
      <Timer />
    </div>
  );
}

export default Landing;
