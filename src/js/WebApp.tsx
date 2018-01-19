import * as React from 'react';
import HeaderContainer from './containers/HeaderContainer';
import VideoPlayerContainer from './containers/VideoPlayerContainer';
import ModalContainer from './containers/ModalContainer';
import VideoListContainer from './containers/VideoListContainer';

interface WebInterface {}

export default class WebApp extends React.Component<WebInterface, {}> {
    constructor(props:WebInterface) {
        super(props);
    }
    render() {
        return (
            <div className="flex-column height-100">
                <HeaderContainer/>
                <div className="divider bg-gray clearfix">
                </div>
                <div className="flex-row flex-1 relative">
                    <div className="video-container flex-center flex-middle flex-column">
                        <VideoPlayerContainer/>
                    </div>
                    <div className="video-nav">
                        <VideoListContainer/>
                    </div>
                </div>
                <ModalContainer/>
            </div>
        );
    }
}