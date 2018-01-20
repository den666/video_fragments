import {AnyAction} from 'redux';
import defaultState from '../initialState/defaultState';
import {videoReducer} from '../initialState/initialStateInterface';
import {SAVE_VIDEO, ACTIVE_VIDEO} from '../actions/videoActions';

const appReducer = (state:videoReducer = defaultState.videoReducer, action: AnyAction): videoReducer => {
    switch (action.type) {
        case SAVE_VIDEO:
            const newList = [...state.videoList];
            newList.push(action.payload);
            return {
                ...state,
                videoList: newList
            };
        case  ACTIVE_VIDEO:
            return {
                ...state,
                videoActive: action.payload
            };
        default:
            return {
                ...state
            };
    }
};

export default appReducer;