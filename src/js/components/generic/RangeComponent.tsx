import * as React from 'react';
import {toDateString} from '../../utils/dateUtils';

interface RangeViewProps {
    videoDuration: string | number,
    start: string | number,
    end: string | number,
    setValue: Function
}

export default class RangeView extends React.Component<RangeViewProps, any> {

    public refs: {
        dragA: HTMLDivElement;
        dragB: HTMLDivElement;
        dragContainer: HTMLDivElement;
    };

    constructor(props:RangeViewProps) {
        super(props);
        this.state = {
            left: 0,
            right: 0,
            statusBar: 0,
        };
    }

    startDragEvent = (ref:string, e:any) => {
        const {videoDuration, setValue} = this.props;
        const itemA = this.refs.dragA;
        const itemB = this.refs.dragB;
        const dragContainer = this.refs.dragContainer;
        const dragContainerW = dragContainer.offsetWidth;
        const dragContainerOffset = dragContainer.offsetLeft;
        const mouseX = e.screenX;

        if (mouseX !== 0 && mouseX > dragContainerOffset && mouseX <= (dragContainerOffset + dragContainerW)) {
            const dragPosition = mouseX - dragContainerOffset;
            const startPercent = (dragPosition * 100) / dragContainerW;
            const proportionalTime = parseInt(((startPercent * +videoDuration) / 100).toString(), 0);
            if (ref === 'dragA' && itemA.offsetLeft <= itemB.offsetLeft && dragPosition <= itemB.offsetLeft - 25) {
                setValue('start', proportionalTime);
                this.setState({
                    left: (dragPosition),
                    statusBar: dragContainerW - dragPosition - this.state.right - 4
                });
            } else if (itemB.offsetLeft >= itemB.offsetLeft && dragPosition >= itemA.offsetLeft + 75) {
                const newRight = dragContainerW - dragPosition;
                setValue('end', proportionalTime);
                this.setState({
                    right: newRight,
                    statusBar: dragContainerW - newRight - this.state.left - 4
                });
            }
        }


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
                    <div className="drag-selector" style={{width: this.state.statusBar, left: this.state.left}}>
                    </div>
                    <div className="range-item range-a"
                         ref="dragA"
                         style={{left: this.state.left}}>
                        <span className="small center-align">
                            {start ? toDateString(start) : '00:00'}
                        </span>
                        <div draggable
                             className="drag-area"
                             onTouchMove={(e:any) => this.startDragEvent('dragA', e)}
                             onDrag={(e:any) => this.startDragEvent('dragA', e)}>
                        </div>
                    </div>
                    <div className="range-item range-b"
                         ref="dragB"
                         style={{right: this.state.right}}>
                        <span className="small center-align">
                            {end ? toDateString(end) : (videoDuration ? toDateString(videoDuration) : '00:00')}
                        </span>
                        <div draggable
                             className="drag-area"
                             onTouchMove={(e:any) => this.startDragEvent('dragB', e)}
                             onDrag={(e:any) => this.startDragEvent('dragB', e)}>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
