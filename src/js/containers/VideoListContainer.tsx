import {connect, Dispatch} from 'react-redux';
import VideoListView from '../components/VideoListView';
import {AppInterface, videoItem} from '../initialState/initialStateInterface';
import {ACTIVE_VIDEO_CHANGE, DELETE_VIDEO, EDIT_VIDEO} from '../actions/videoActions';
import {SHOW_MODAL} from '../actions/appActions';


export interface newListInterface extends videoItem{
    setActiveVideo?: Function
    deleteVideo?: Function
    editVideo?: Function
}

interface stateProps {
    videoList: videoItem[],
    videoActive: videoItem,
    isEditing: boolean
}

interface dispatchProps {
    setActiveVideo: Function,
    deleteVideo: Function
    editVideo: Function
}

interface newStateProps extends stateProps {
    videoList: newListInterface[],
}

const mapStateToProps = (state:AppInterface): stateProps => {
    return {
        videoList: state.videoReducer.videoList,
        videoActive: state.videoReducer.videoActive,
        isEditing: state.appReducer.isEditing
    };
};


const mapDispatchToProps = (dispatch:Dispatch<any>): dispatchProps => {
    return {
        setActiveVideo: (data:videoItem) => () => {
            dispatch({
                type: ACTIVE_VIDEO_CHANGE,
                payload: data
            });
        },
        deleteVideo: (id:number, isActive: null | videoItem) => () => {
            console.log('eliminar', id);
            if (isActive) {
                dispatch({
                    type: ACTIVE_VIDEO_CHANGE,
                    payload: isActive
                });
            }
            dispatch({
                type: DELETE_VIDEO,
                payload: id
            });
        },
        editVideo: (item:videoItem) => () => {
            console.log('editar', item);
            dispatch({
                type: EDIT_VIDEO,
                payload: item
            });
            dispatch({
                type: SHOW_MODAL
            });
        }


    };
};


const mergeProps = (stateProps: stateProps, dispatchProps: dispatchProps) => {
    const newList = stateProps.videoList.map((item, key) => {
        const newItem:newListInterface = {...item};
        const tempItem = {...item};
        newItem.setActiveVideo = () => dispatchProps.setActiveVideo(tempItem);
        newItem.editVideo = () => dispatchProps.editVideo(item);
        newItem.deleteVideo = () => dispatchProps.deleteVideo(
                                        tempItem.id,
                                        (stateProps.videoActive.id === tempItem.id && stateProps.videoList[0])
                                    );
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