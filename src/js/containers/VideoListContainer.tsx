import {connect, Dispatch} from 'react-redux';
import VideoListView from '../components/VideoListView';
import {AppInterface, videoItem} from '../initialState/initialStateInterface';
import {SHOW_MODAL} from '../actions/appActions';

interface stateProps {
    videoList: videoItem[]
}

interface dispatchProps {
}

const mapStateToProps = (state:AppInterface): stateProps => {
    return {
        videoList: state.videoReducer.videoList
    };
};



const mapDispatchToProps = (dispatch:Dispatch<any>): dispatchProps => {
    return {
    };
};

const VideoListContainer = connect<stateProps, dispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(VideoListView);

export default VideoListContainer;

export type VideoListContainerProps = stateProps & dispatchProps;