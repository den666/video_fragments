import * as React from 'react';

import {VideoListContainerProps} from '../containers/VideoListContainer';
import {EDITOR_LABELS} from '../constants/appLabelsConstants';


export default class VideoListView extends React.Component<VideoListContainerProps, any> {
    constructor(props:VideoListContainerProps) {
        super(props);
    }
    render() {
        const {videoList} = this.props;
        return (
            <div className="list-component">
                {videoList.map((item, key) => {
                    return  <div key={key} className={`list-item flex-row ${item.main && 'main'}`}>
                                <div className={`play-icon flex-column`}>
                                    <i className="i-css i-play"></i>
                                </div>
                                <div className="plan-data flex-column">
                                    <div>
                                        <span>{EDITOR_LABELS.NAME}:</span> {item.name}
                                    </div>
                                    {item.tags &&
                                        <div>
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
