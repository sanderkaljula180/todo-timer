import * as actionTypes from './timer.actionTypes';


const initialState = {
    loading: false,
    time: null,
    // isTimeRunning läheb lS
    isTimeRunning: false,
    // activeOption läheb localStorage
    activeOption: "Pomodoro",
    error: null,
    // Need kolm võetakse serverist hiljem
    pomodoroMinutes: 25,
    longBreakMinutes: 15,
    shortBreakMinutes: 5,
};

export const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_TIMER:
            return { ...state, loading: true };
        case actionTypes.CHANGE_TIMER_SUCCESS:
            return { ...state, loading: false, activeOption: action.newOption };
        case actionTypes.CHANGE_POMODORO_TIME_SUCCESS:
            return { ...state, pomodoroMinutes: action.value };
        case actionTypes.CHANGE_SHORT_BREAK_TIME_SUCCESS:
            return { ...state, shortBreakMinutes: action.value };
        case actionTypes.CHANGE_LONG_BREAK_TIME_SUCCESS:
            return { ...state, longBreakMinutes: action.value };
        default:
            return state;
    }
}

export default taskReducer;