import {combineEpics} from 'redux-observable';
import {changeVideo} from './videoEpics';

export default combineEpics(
    changeVideo
);