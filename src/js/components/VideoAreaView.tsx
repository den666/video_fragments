import * as React from 'react';
import {VideoAreaContainerProps} from '../containers/VideoAreaContainer';
import VideoPlayerComponent from '../components/generic/VideoPlayerComponent';
import {EDITOR_LABELS} from '../constants/appLabelsConstants';

export default class VideoAreaView extends React.Component<VideoAreaContainerProps, any> {
    constructor(props:VideoAreaContainerProps) {
        super(props);
    }
    render() {
        const {openEdit, videoActive, nextVideo} = this.props;
        return (
            <div className="width-100 center-align flex-row flex-center">
                <div className="p-l-lg p-r-lg player-area">
                    <VideoPlayerComponent nextVideo={nextVideo} videoActive={videoActive}/>
                    <div className="right-align m-t">
                        <a onClick={() => openEdit()} className="btn-defaul">{EDITOR_LABELS.ADD_FRAGMENT}</a>
                    </div>
                </div>
            </div>
        );
    }
}
