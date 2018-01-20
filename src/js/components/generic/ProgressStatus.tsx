import * as React from 'react';
import {toDateString} from '../../utils/dateUtils';

interface RangeViewProps {
    videoDuration: number,
    start: number,
    end: number,
    progress: number
}

export default class ProgressStatusView extends React.Component<RangeViewProps, any> {

    public refs: {
        dragContainer: HTMLDivElement;
    };


    constructor(props:RangeViewProps) {
        super(props);
        this.state = {
            left: 0,
            right: 0,
            statusBar: 0,
            activeArea: 0
        };
    }

    getPosition = (nextProps:RangeViewProps) => {
        const {videoDuration, start, end, progress} = nextProps;
        const mainProgressWidth = this.refs.dragContainer.offsetWidth;
        const left = (start * mainProgressWidth) / videoDuration;
        const right = mainProgressWidth - (end * mainProgressWidth) / videoDuration;
        const activeArea = mainProgressWidth - left - right;
        const statusBar = ((progress * mainProgressWidth) / videoDuration) - left;
        this.setState({
            left,
            right,
            activeArea,
            statusBar
        });
    }

    componentWillReceiveProps (nextProps:RangeViewProps) {
        this.getPosition(nextProps);
    }

    render() {
        const {videoDuration, start, end} = this.props;
        return (
            <div className="range-component m-t m-b m-l-lg m-r-lg">
                <div className="start left p-l text-primary small light">
                    00:00
                </div>
                <div className="end right p-r text-primary small light">
                    {videoDuration ? toDateString(videoDuration) : '00:00'}
                </div>
                <div ref="dragContainer" className="time-line m-b-lg clearfix">
                    <div className="drag-selector" style={{width: this.state.activeArea, left: this.state.left}}>
                    </div>
                    <div className="drag-selector progress"
                         style={{width: this.state.statusBar, left: this.state.left}}>
                    </div>
                    <div className="range-item range-a"
                         ref="dragA"
                         style={{left: this.state.left}}>
                        <span className="small center-align">
                            {start ? toDateString(start) : '00:00'}
                        </span>
                    </div>
                    <div className="range-item range-b"
                         ref="dragB"
                         style={{right: this.state.right}}>
                        <span className="small center-align">
                            {end ? toDateString(end) : (videoDuration ? toDateString(videoDuration) : '00:00')}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
