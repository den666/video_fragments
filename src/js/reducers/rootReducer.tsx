import {combineReducers} from 'redux';
import appReducer from './appReducer';
import videoReducer from './videoReducer';

export default combineReducers({
    appReducer,
    videoReducer
});