import {connect, Dispatch} from 'react-redux';
import ModalView from '../components/ModalView';
import {AppInterface, videoItem} from '../initialState/initialStateInterface';
import {HIDE_MODAL} from '../actions/appActions';
import {SAVE_VIDEO} from '../actions/videoActions';

interface stateProps {
    mainVideo: videoItem,
    show: boolean
}

interface dispatchProps {
    closeEdit: Function,
    saveVideo: Function
}

const mapStateToProps = (state:AppInterface, ownProps: {}): stateProps => {
    return {
        mainVideo: state.videoReducer.videoList[0],
        show: state.appReducer.showModal
    };
};


const mapDispatchToProps = (dispatch:Dispatch<any>): dispatchProps => {
    return {
        closeEdit: () => {
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
        }
    };
};

const ModalContainer = connect<stateProps, dispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(ModalView);

export default ModalContainer;

export type ModalContainerProps = stateProps & dispatchProps;