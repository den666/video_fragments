import * as React from 'react';
import {VideoPlayerContainerProps} from '../containers/VideoPlayerContainer';
import {EDITOR_LABELS} from '../constants/appLabelsConstants';

export default class RoutesView extends React.Component<VideoPlayerContainerProps, any> {
    constructor(props:VideoPlayerContainerProps) {
        super(props);
    }
    render() {
        const {openEdit} = this.props;
        return (
            <div className="width-100 center-align flex-row flex-center">
                <div className="p-l-lg p-r-lg player-area">
                    <video id="frag1" controls preload="metadata" width="100%">
                        <source src="http://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4#t=00:00:20"/>
                    </video>
                    <div className="right-align m-t">
                        <a onClick={() => openEdit()} className="btn-defaul">{EDITOR_LABELS.ADD_FRAGMENT}</a>
                    </div>
                </div>
            </div>
        );
    }
}
