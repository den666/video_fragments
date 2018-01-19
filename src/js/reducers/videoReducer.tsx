import {AnyAction} from 'redux';
import defaultState from '../initialState/defaultState';
import {videoReducer} from '../initialState/initialStateInterface';
import {SAVE_VIDEO} from '../actions/videoActions';

const appReducer = (state:videoReducer = defaultState.videoReducer, action: AnyAction): videoReducer => {
    switch (action.type) {
        case SAVE_VIDEO:
            const newList = [...state.videoList];
            newList.push(action.payload);
            console.log('action', newList);
            return {
                ...state,
                videoList: newList
            };
        default:
            return {
                ...state
            };
    }
};

export default appReducer;