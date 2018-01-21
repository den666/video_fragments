import * as React from 'react';
import {videoItem} from '../../initialState/initialStateInterface';
import {EDITOR_LABELS, LAYOUT} from '../../constants/appLabelsConstants';
import {toDateString} from '../../utils/dateUtils';
import ProgressStatus from '../generic/ProgressStatus';
import VideoTimeLineListComponent from '../generic/VideoTimeLineListComponent';
import {hashCode} from '../../utils/stringUtils';

interface videoPlayerProps {
    videoActive: videoItem,
    videoList: videoItem[],
    nextVideo: Function,
    setActiveVideo: Function,
    prevVideo: Function
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
            changeVideo: false,
            isPlay: false
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
                        progress: videoItem.currentTime,
                        isPlay: true
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
                } else {
                    this.setState({
                        isPlay: false
                    });
                }
            },
            250);
    }

    getVideoData = () => {
        const editorVideoItem:any = document.getElementById('fragmentVideo');
        if (editorVideoItem && editorVideoItem.readyState) {
            editorVideoItem.autoplay = true;
            this.setState({
                videoDuration: parseInt(editorVideoItem.duration, 0)
            });
            editorVideoItem.removeEventListener('durationchange', this.getVideoData);
        }
    }

    playButton = () => {
        const editorVideoItem:any = document.getElementById('fragmentVideo');
        if (this.state.isPlay) {
            editorVideoItem.pause();
        } else {
            editorVideoItem.play();
        }
    }

    componentDidMount () {
        this.progress();
        document.getElementById('fragmentVideo').addEventListener('durationchange', this.getVideoData);
    }

    gotoPoint = (item:videoItem) => {
        const editorVideoItem:any = document.getElementById('fragmentVideo');
        if (editorVideoItem && editorVideoItem.readyState) {
            editorVideoItem.currentTime = item.start;
            editorVideoItem.play();
        }
    }


    componentWillReceiveProps (nextProps: videoPlayerProps) {
        if (nextProps.videoActive.isLoad) {
            this.setState({
                videoPlayer: <div className="loader">
                                <img src={LAYOUT.LOADER}/>
                                <div className="loader-icon"></div>
                             </div>
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
        const {videoActive, setActiveVideo, videoList, nextVideo, prevVideo} = this.props;
        return  <div className="width-100">
                    <div className="left-align m-b-lg">
                        <span className="light size-h4 text-primary">{videoActive.name}</span>
                        {videoActive.tags &&
                        <div className="small light left-align">
                            <span className="bold text-primary">{EDITOR_LABELS.TAGS}: </span>
                            <span className="text-gray">{videoActive.tags}</span>
                        </div>
                        }
                    </div>
                    {this.state.videoPlayer}

                    <div className="video-control left-align">
                        <div className="btn-item inline-block">
                            <a className="pointer inline-block" onClick={this.playButton}>
                                {this.state.isPlay ?
                                    <i className="i-css i-pause"></i>
                                    :
                                    <i className="i-css i-play"></i>
                                }
                            </a>
                            <div className="small center-align text-gray text-white">{` - `}</div>
                        </div>
                        {videoList.length > 1 &&
                            [
                                <div key={'a'} className="btn-item inline-block"
                                     onClick={() => {
                                         !videoActive.isLoad && prevVideo();
                                     }}>
                                    <a className="pointer inline-block" onClick={this.playButton}>
                                        <i className="i-css i-arrow-l"></i>
                                    </a>
                                    <div className="small center-align text-gray">{`key: <`}</div>
                                </div>,
                                <div key={'b'}
                                     className="btn-item inline-block"
                                     onClick={() => {
                                         !videoActive.isLoad && nextVideo();
                                     }}>
                                    <a className="pointer inline-block" onClick={this.playButton}>
                                        <i className="i-css i-arrow-r"></i>
                                    </a>
                                    <div className="small center-align text-gray">{`key: >`}</div>
                                </div>
                            ]
                        }
                    </div>

                    {videoActive.start && !videoActive.isLoad ?
                        <ProgressStatus start={videoActive.start}
                                        end={videoActive.end}
                                        progress={this.state.progress}
                                        videoDuration={this.state.videoDuration}/>
                    : null}

                    {videoActive.main && videoList.length > 1 ?
                        [
                            <div key="a" className="text-primary size-h4">{EDITOR_LABELS.VIDEO_LIST}</div>,
                            <VideoTimeLineListComponent
                                setActiveVideo={this.gotoPoint}
                                key="b"
                                videoList={videoList}
                                videoDuration={this.state.videoDuration}/>
                        ]
                    : null}

                </div>;
    }
}
