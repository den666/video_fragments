import {connect, Dispatch} from 'react-redux';
import VideoListView from '../components/VideoListView';
import {AppInterface, videoItem} from '../initialState/initialStateInterface';
import {ACTIVE_VIDEO_CHANGE} from '../actions/videoActions';


interface newListInterface extends videoItem{
    setActiveVideo?: Function
}

interface stateProps {
    videoList: videoItem[],
    videoActive: videoItem
}

interface dispatchProps {
    setActiveVideo: Function
}

interface newStateProps extends stateProps {
    videoList: newListInterface[],
}

const mapStateToProps = (state:AppInterface): stateProps => {
    return {
        videoList: state.videoReducer.videoList,
        videoActive: state.videoReducer.videoActive,
    };
};


const mapDispatchToProps = (dispatch:Dispatch<any>): dispatchProps => {
    return {
        setActiveVideo: (data:videoItem, videoActive: videoItem) => () => {
            if (videoActive.id !== data.id && !videoActive.isLoad) {
                console.log('cambiar');
                dispatch({
                    type: ACTIVE_VIDEO_CHANGE,
                    payload: data
                });
            }
        }
    };
};


const mergeProps = (stateProps: stateProps, dispatchProps: dispatchProps) => {
    const newList = stateProps.videoList.map((item, key) => {
        const newItem:newListInterface = {...item};
        newItem.setActiveVideo = () => dispatchProps.setActiveVideo(item, stateProps.videoActive);
        return newItem;
    });
    return {
        ...stateProps,
        ...dispatchProps,
        videoList: [...newList]
    };
};

const VideoListContainer = connect<stateProps, dispatchProps, any>(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(VideoListView);

export default VideoListContainer;

export type VideoListContainerProps = newStateProps & dispatchProps;