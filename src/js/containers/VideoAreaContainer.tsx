import {connect, Dispatch} from 'react-redux';
import VideoAreaView from '../components/VideoAreaView';
import {AppInterface, videoItem} from '../initialState/initialStateInterface';
import {HIDE_MODAL, SHOW_MODAL} from '../actions/appActions';
import {ACTIVE_VIDEO_CHANGE} from '../actions/videoActions';

interface stateProps {
    videoActive: videoItem,
    videoList: videoItem[]
    isEditing: boolean
}

interface dispatchProps {
    openEdit: Function,
    nextVideo: Function,
    prevVideo: Function
}

const mapStateToProps = (state:AppInterface): stateProps => {
    return {
        videoActive: state.videoReducer.videoActive,
        videoList: state.videoReducer.videoList,
        isEditing: state.appReducer.isEditing
    };
};



const mapDispatchToProps = (dispatch:Dispatch<any>): dispatchProps => {
    return {
        openEdit: () => {
            dispatch({
                type: SHOW_MODAL
            });
        },
        nextVideo: (next:videoItem) => () => {
            dispatch({
                type: ACTIVE_VIDEO_CHANGE,
                payload: next
            });
        },
        prevVideo: (prev:videoItem) => () => {
            dispatch({
                type: ACTIVE_VIDEO_CHANGE,
                payload: prev
            });
        }
    };
};

const mergeProps = (stateProps: stateProps, dispatchProps: dispatchProps) => {
    let  activeKey:number = 0;
    stateProps.videoList.map((item, key) => {
        if (item.id === stateProps.videoActive.id) {
            activeKey = key;
        }
    });
    const next = stateProps.videoActive;
    return {
        ...stateProps,
        ...dispatchProps,
        nextVideo: dispatchProps.nextVideo(stateProps.videoList[activeKey + 1] || stateProps.videoList[0]),
        prevVideo: dispatchProps.prevVideo(
                        (activeKey > 0
                        ? stateProps.videoList[activeKey - 1]
                        : stateProps.videoList[stateProps.videoList.length - 1])
        )
    };
};


const VideoPlayerContainer = connect<stateProps, dispatchProps, any>(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(VideoAreaView);

export default VideoPlayerContainer;

export type VideoAreaContainerProps = stateProps & dispatchProps;