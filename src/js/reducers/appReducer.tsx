import {AnyAction} from 'redux';
import defaultState from '../initialState/defaultState';
import {appReducer} from '../initialState/initialStateInterface';
import {HIDE_MODAL, SHOW_MODAL} from '../actions/appActions';

const appReducer = (state:appReducer = defaultState.appReducer, action: AnyAction): appReducer => {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                showModal: true
            };
        case HIDE_MODAL:
            return {
                ...state,
                showModal: false
            };
        default:
            return {
                ...state
            };
    }
};

export default appReducer;