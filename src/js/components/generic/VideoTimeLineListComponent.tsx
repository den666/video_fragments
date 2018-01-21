import * as React from 'react';
import {videoItem} from '../../initialState/initialStateInterface';
import {toDateString} from '../../utils/dateUtils';

interface VideoTimeListProps {
    videoDuration: number | null,
    videoList: any,
    setActiveVideo: Function
}

export default class VideoTimeLineListComponent extends React.Component<VideoTimeListProps, any> {

    public refs: {
        dragContainer: HTMLDivElement;
    };


    constructor(props:VideoTimeListProps) {
        super(props);
    }

    getPosition = (start:number) => {
        const {videoDuration} = this.props;
        const elementProgress = document.getElementById('dragContainer');
        if (elementProgress) {
            const mainProgressWidth = elementProgress.offsetWidth;
            const left = (((start * mainProgressWidth) / videoDuration).toFixed());
            return parseInt(left, 0) || 0;
        }
        return 0;
    }

    render() {
        const {videoDuration, setActiveVideo, videoList} = this.props;
        return (
            <div className="range-component range-component-time m-t m-b m-l-lg m-r-lg">
                <div className="start left p-l text-primary small light">
                    00:00
                </div>
                <div className="end right p-r text-primary small light">
                    {videoDuration ? toDateString(videoDuration) : '00:00'}
                </div>
                <div ref="dragContainer" id="dragContainer" className="time-line m-b-lg clearfix">
                    {videoList && videoList.map((item:videoItem, key:number) => {
                        if (!item.main) {
                            return <div key={key} className="range-item range-a"
                                        onClick={() => {
                                            setActiveVideo(item);
                                        }}
                                        style={{left: this.getPosition(item.start)}}>
                                    <span className="small center-align">
                                        {item.start ? toDateString(item.start) : '00:00'}
                                    </span>
                            </div>;
                        }
                    })
                    }
                </div>
            </div>
        );
    }
}