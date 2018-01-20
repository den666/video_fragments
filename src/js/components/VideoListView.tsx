import * as React from 'react';

import {VideoListContainerProps} from '../containers/VideoListContainer';
import {EDITOR_LABELS} from '../constants/appLabelsConstants';
import {videoItem} from '../initialState/initialStateInterface';


export default class VideoListView extends React.Component<VideoListContainerProps, any> {
    constructor(props:VideoListContainerProps) {
        super(props);
    }
    getItemClass = (item: videoItem, videoActiveId:number) => {
        return `${item.id === videoActiveId && 'active'} pointer list-item flex-row ${item.main && 'main'}`;
    }
    render() {
        const {videoList, videoActive, setActiveVideo} = this.props;
        return (
            <div className="list-component">
                {videoList.map((item, key) => {
                    return  <div key={key}
                                 onClick={item.setActiveVideo()}
                                 className={this.getItemClass(item, videoActive && videoActive.id)}>
                                <div className={`play-icon flex-column`}>
                                    <i className="i-css i-play"></i>
                                </div>
                                <div className="plan-data flex-column">
                                    <div className="ttr">
                                        <span>{EDITOR_LABELS.NAME}:</span> {item.name}
                                    </div>
                                    {item.tags &&
                                        <div className="ttr">
                                            <span>{EDITOR_LABELS.TAGS}:</span> {item.tags}
                                        </div>
                                    }
                                </div>
                            </div>;
                })
                }
                <div className="clearfix"></div>
            </div>
        );
    }
}
