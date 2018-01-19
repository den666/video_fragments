import {connect, Dispatch} from 'react-redux';
import VideoPlayerView from '../components/VideoPlayerView';
import {AppInterface} from '../initialState/initialStateInterface';
import {HIDE_MODAL, SHOW_MODAL} from '../actions/appActions';

interface stateProps {
}

interface dispatchProps {
    openEdit: Function,
}

const mapStateToProps = (state:AppInterface): stateProps => {
    console.log('data', state);
    return {
    };
};



const mapDispatchToProps = (dispatch:Dispatch<any>): dispatchProps => {
    return {
        openEdit: () => {
            dispatch({
                type: SHOW_MODAL
            });
        }
    };
};

const VideoPlayerContainer = connect<stateProps, dispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(VideoPlayerView);

export default VideoPlayerContainer;

export type VideoPlayerContainerProps = stateProps & dispatchProps;