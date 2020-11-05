import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import './timer.scss';
import FlatButton from '../ui/FlatButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


const Timer = () => {

  // SELLE PANEB STATE JA ALGNE STATE ON LIHTSALT 45:00 JA SETTINGSID PEAB KA ÄRA TEGEMA
  // ET SEKUNDI PROTSENTE SAADA MA PEAN SEKUNDEID LUGEMA JA SEKUNDID KONVERTEERIMA KA MINUTIKS


  const dispatch = useDispatch();

  let minuteSettings;

  const { 
    activeOption,
    pomodoroMinutes, 
    longBreakMinutes, 
    shortBreakMinutes, 
    isTimeRunning,
    time
  } = useSelector(state => ({

    activeOption: state.timerReducer.activeOption,
    pomodoroMinutes: state.timerReducer.pomodoroMinutes,
    longBreakMinutes: state.timerReducer.longBreakMinutes,
    shortBreakMinutes: state.timerReducer.shortBreakMinutes,
    isTimeRunning: state.timerReducer.isTimeRunning,
    time: state.timerReducer.time,
  }), shallowEqual);

  // NII MA SAAN INPUT TEHA .MAP'IGA
  const mapItems = { pomodoroMinutes, longBreakMinutes, shortBreakMinutes };
  console.log(mapItems);
  
  /*useEffect(() => {
    setPercentage(Math.floor((seconds / 600) * 100));
  });*/
  
  return (
    <div className="Section Timer">
      <FlatButton 
        btnValue="Pomodoro" 
        setActive={() => dispatch({ type: 'CHANGE_TIMER', option: 'Pomodoro', activeOption: activeOption })} 
        activeOption={"Pomodoro" === activeOption ? "FlatButton Active" : "FlatButton"} />
      <FlatButton 
        btnValue="Short Break" 
        setActive={() => dispatch({ type: 'CHANGE_TIMER', option: 'Short Break', activeOption: activeOption })} 
        activeOption={"Short Break" === activeOption ? "FlatButton Active" : "FlatButton"} />
      <FlatButton 
        btnValue="Long Break" 
        setActive={() => dispatch({ type: 'CHANGE_TIMER', option: 'Long Break', activeOption: activeOption })} 
        activeOption={"Long Break" === activeOption ? "FlatButton Active" : "FlatButton"} />
      <Box position="relative" display="inline-flex">
        <CircularProgress variant="static" size={400} value={100} />
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center" >
            {
              isTimeRunning ? 
              <Typography 
                variant="caption" 
                component="div" 
                color="textSecondary"> 
                  {time} 
              </Typography>

              :

              <Typography 
                variant="caption" 
                component="div" 
                color="textSecondary"> 
                  {(() => {
                    switch (activeOption) {
                      case "Short Break":   return shortBreakMinutes;
                      case "Long Break": return longBreakMinutes;
                      default:      return pomodoroMinutes;
                    }
                  })()}
              </Typography>
            }
          </Box>
      </Box>
      <button onClick={() => dispatch({ type: 'START_TIMER'  })} >START</button>
      
        <label>
          Pomodoro minutes:
          <input 
            onChange={(e) => dispatch({ type: 'CHANGE_POMODORO_TIME', value: e.target.value  })}
            type="text" 
            name="Pomodoro" 
            value={pomodoroMinutes} />
        </label>
        <label>
          Short Break minutes:
          <input 
            onChange={(e) => dispatch({ type: 'CHANGE_SHORT_BREAK_TIME', value: e.target.value  })}
            type="text" 
            name="Short Break" 
            value={shortBreakMinutes}/>
        </label>
        <label>
          Long Break minutes:
          <input 
            onChange={(e) => dispatch({ type: 'CHANGE_LONG_BREAK_TIME', value: e.target.value  })}
            type="text" 
            name="Long Break" 
            value={longBreakMinutes}/>
        </label>
    </div>
  );
}

export default Timer;