import * as React from 'react';
import {videoItem} from '../../initialState/initialStateInterface';
import {toDateString} from '../../utils/dateUtils';
import ProgressStatus from '../generic/ProgressStatus';
import {hashCode} from '../../utils/stringUtils';

interface videoPlayerProps {
    videoActive: videoItem,
    nextVideo: Function
}

export default class VideoPlayerComponent extends React.Component<videoPlayerProps, any> {
    constructor(props:videoPlayerProps) {
        super(props);
        this.state = {
            videoDuration: null,
            videoPlayer: <video id="fragmentVideo" controls preload="metadata" width="100%">
                            <source src={this.props.videoActive.url}/>
                        </video>,
            progress: 0,
            changeVideo: false
        };
    }
    getUrl = (videoActive: videoItem) => {
        if (!videoActive.start || !videoActive.end) {
            return videoActive.url;
        }
        return `${videoActive.url}#t=${toDateString(videoActive.start)},${toDateString(videoActive.end)}`;
    }

    progress = () => {
        setInterval(
            () => {
                const videoItem:any = document.getElementById('fragmentVideo');
                if (videoItem && videoItem.readyState && !videoItem.paused) {
                    this.setState({
                        progress: videoItem.currentTime
                    });
                    if (!this.state.changeVideo
                        && (this.props.videoActive.end && videoItem.currentTime >= this.props.videoActive.end - 1
                        || !this.props.videoActive.end && videoItem.currentTime >= this.state.videoDuration - 1)) {
                        this.setState(
                            {
                                changeVideo: true
                            },
                            () => {
                                setTimeout(
                                    () => {
                                        this.props.nextVideo();
                                    },
                                    1000
                                );
                            }
                        );
                    }
                }
            },
            250);
    }

    getVideoData = () => {
        const editorVideoItem:any = document.getElementById('fragmentVideo');
        if (editorVideoItem.readyState) {
            editorVideoItem.autoplay = true;
            this.setState({
                videoDuration: parseInt(editorVideoItem.duration, 0)
            });
            document.getElementById('fragmentVideo').removeEventListener('durationchange', this.getVideoData);
        }
    }

    componentDidMount () {
        this.progress();
        document.getElementById('fragmentVideo').addEventListener('durationchange', this.getVideoData);
    }

    componentWillReceiveProps (nextProps: videoPlayerProps) {
        if (nextProps.videoActive.isLoad) {
            this.setState({
                videoPlayer: <div>cargando</div>
            });
        } else {
            this.setState(
                {
                    videoPlayer: <video id="fragmentVideo"
                                        autoPlay
                                        controls={nextProps.videoActive.main}
                                        preload="metadata"
                                        width="100%">
                                    <source src={this.getUrl(nextProps.videoActive)}/>
                                </video>,
                    changeVideo: false
                });
        }
    }
    render() {
        const {videoActive} = this.props;
        return  <div className="width-100">
                    {this.state.videoPlayer}
                    {videoActive.start && !videoActive.isLoad ?
                        <ProgressStatus start={videoActive.start}
                                        end={videoActive.end}
                                        progress={this.state.progress}
                                        videoDuration={this.state.videoDuration}/>
                    : null}
                </div>;
    }
}
