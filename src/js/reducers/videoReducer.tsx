import {AnyAction} from 'redux';
import defaultState from '../initialState/defaultState';
import {videoReducer, videoItem} from '../initialState/initialStateInterface';
import {SAVE_VIDEO, ACTIVE_VIDEO, DELETE_VIDEO, EDIT_VIDEO, UPDATE_VIDEO} from '../actions/videoActions';

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
        case  EDIT_VIDEO:
            return {
                ...state,
                videoEdit: action.payload
            };
        case  UPDATE_VIDEO:
            const newListUpdate = [...state.videoList.map((item, key) => {
                if (item.id === action.payload.id) {
                    return action.payload;
                }
                return item;
            })];
            return {
                ...state,
                videoList: newListUpdate
            };
        case  DELETE_VIDEO:
            const newListDeleted = [...state.videoList.filter(item => item.id !== action.payload)];
            console.log('newListDeleted', newListDeleted);
            return {
                ...state,
                videoList: newListDeleted
            };
        default:
            return {
                ...state
            };
    }
};

export default appReducer;