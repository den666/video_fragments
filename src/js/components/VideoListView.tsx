import * as React from 'react';

import {VideoListContainerProps} from '../containers/VideoListContainer';
import {EDITOR_LABELS} from '../constants/appLabelsConstants';
import {videoItem} from '../initialState/initialStateInterface';


export default class VideoListView extends React.Component<VideoListContainerProps, any> {
    constructor(props:VideoListContainerProps) {
        super(props);
    }
    getItemClass = (item: videoItem, videoActiveId:number) => {
        return `${item.id === videoActiveId && 'active'} list-item flex-row ${item.main && 'main'}`;
    }
    render() {
        const {videoList, videoActive, setActiveVideo} = this.props;
        return (
            <div className="list-component">
                {videoList.map((item, key) => {
                    return  <div key={key}
                                 className={this.getItemClass(item, videoActive && videoActive.id)}>
                                <div className={`play-icon flex-column`}>
                                    <i className="i-css i-play"></i>
                                </div>
                                <div className={`${!item.main && 'p-t-lg'} plan-data flex-column`}>
                                    <div className="ttr">
                                        <span>{EDITOR_LABELS.NAME}:</span> {item.name}
                                    </div>
                                    {item.tags &&
                                        <div className="ttr">
                                            <span>{EDITOR_LABELS.TAGS}:</span> {item.tags}
                                        </div>
                                    }


                                </div>
                                <div className="click-area pointer width-100 height-100"
                                     onClick={item.setActiveVideo()}>
                                </div>
                                {!item.main &&
                                    <div className="edit-area">
                                        <a onClick={item.editVideo()}>{EDITOR_LABELS.EDIT}</a>
                                        <a onClick={item.deleteVideo()}>{EDITOR_LABELS.DELETE}</a>
                                    </div>
                                    }
                            </div>;
                })
                }
                <div className="clearfix"></div>
            </div>
        );
    }
}
