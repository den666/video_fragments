import {connect, Dispatch} from 'react-redux';
import ModalView from '../components/ModalView';
import {AppInterface, videoItem} from '../initialState/initialStateInterface';
import {HIDE_MODAL} from '../actions/appActions';
import {SAVE_VIDEO, UPDATE_VIDEO, EDIT_VIDEO, ACTIVE_VIDEO_CHANGE} from '../actions/videoActions';

interface stateProps {
    mainVideo: videoItem,
    editVideo?: videoItem,
    videoActive: videoItem,
    show: boolean
}

interface dispatchProps {
    closeEdit: Function,
    saveVideo: Function,
    updateVideo: Function
}

const mapStateToProps = (state:AppInterface, ownProps: {}): stateProps => {
    return {
        mainVideo: state.videoReducer.videoList[0],
        videoActive: state.videoReducer.videoActive,
        editVideo: state.videoReducer.videoEdit || null,
        show: state.appReducer.showModal
    };
};


const mapDispatchToProps = (dispatch:Dispatch<any>): dispatchProps => {
    return {
        closeEdit: () => {
            dispatch({
                type: EDIT_VIDEO,
                payload: null
            });
            dispatch({
                type: HIDE_MODAL
            });
        },
        saveVideo: (data: videoItem) => {
            dispatch({
                type: SAVE_VIDEO,
                payload: data
            });
            dispatch({
                type: HIDE_MODAL
            });
        },
        updateVideo: (data: videoItem, active: videoItem) => {
            dispatch({
                type: UPDATE_VIDEO,
                payload: data
            });
            dispatch({
                type: EDIT_VIDEO,
                payload: null
            });
            dispatch({
                type: HIDE_MODAL
            });
            if (data.id === active.id) {
                dispatch({
                    type: ACTIVE_VIDEO_CHANGE,
                    payload: data
                });
            }
        }
    };
};

const ModalContainer = connect<stateProps, dispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(ModalView);

export default ModalContainer;

export type ModalContainerProps = stateProps & dispatchProps;