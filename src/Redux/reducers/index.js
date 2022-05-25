import currentProjectReducer from './currentProject'
import currentUsernameReducer from './currentUsername';
import { combineReducers } from 'redux'

const allReducers = combineReducers({
    currentProject: currentProjectReducer,
    currentUsername: currentUsernameReducer
});

export default allReducers;