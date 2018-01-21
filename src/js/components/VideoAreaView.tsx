import * as React from 'react';
import {VideoAreaContainerProps} from '../containers/VideoAreaContainer';
import VideoPlayerComponent from '../components/generic/VideoPlayerComponent';
import {EDITOR_LABELS} from '../constants/appLabelsConstants';

export default class VideoAreaView extends React.Component<VideoAreaContainerProps, any> {
    constructor(props:VideoAreaContainerProps) {
        super(props);
    }

    handleOnKeyDown = (e: KeyboardEvent): void => {
        if (!this.props.videoActive.isLoad && this.props.videoList.length > 1) {
            if (e.keyCode === 39) {
                console.log('si');
                this.props.nextVideo();
            }
            if (e.keyCode === 37) {
                console.log('no');
                this.props.prevVideo();
            }
        }
    }

    publicView = () => {
        window.location.href = '/index.html?edit=false';
    }

    editView = () => {
        window.location.href = '/';
    }

    componentDidMount () {
        document.addEventListener('keydown', this.handleOnKeyDown);
    }

    componentWillUnmount () {
        document.removeEventListener('keydown', this.handleOnKeyDown);
    }

    render() {
        const {openEdit, isEditing, setActiveVideo, videoActive, videoList, prevVideo, nextVideo} = this.props;
        return (
            <div className="p-t p-b width-100 center-align flex-row flex-center">
                <div className="p-l-lg p-r-lg player-area">
                    <VideoPlayerComponent nextVideo={nextVideo}
                                          setActiveVideo={setActiveVideo}
                                          prevVideo={prevVideo}
                                          videoList={videoList}
                                          videoActive={videoActive}/>
                    {isEditing ?
                        <div className="right-align m-b">
                            <a onClick={() => openEdit()} className="btn-defaul m-t ">{EDITOR_LABELS.ADD_FRAGMENT}</a>
                            <a onClick={this.publicView} className="m-l m-t btn-defaul">{EDITOR_LABELS.PUBLIC_VIEW}</a>
                        </div>
                        :
                        <div className="right-align m-b">
                            <a onClick={this.editView} className="m-l m-t btn-defaul">{EDITOR_LABELS.EDIT_VIEW}</a>
                        </div>
                    }
                </div>
            </div>
        );
    }
}
