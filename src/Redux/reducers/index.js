import currentProjectReducer from './currentProject'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
    currentProject: currentProjectReducer
});

export default allReducers;