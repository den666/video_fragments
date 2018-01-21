import * as React from 'react';

import {VideoListContainerProps, newListInterface} from '../containers/VideoListContainer';
import {EDITOR_LABELS} from '../constants/appLabelsConstants';
import {videoItem} from '../initialState/initialStateInterface';
import {fixText, hashCode} from '../utils/stringUtils';


export default class VideoListView extends React.Component<VideoListContainerProps, any> {
    constructor(props:VideoListContainerProps) {
        super(props);
        this.state = {
            videoList: this.props.videoList,
            searchValue: ''
        };
    }
    getItemClass = (item: videoItem, videoActiveId:number) => {
        return `${item.id === videoActiveId && 'active'} list-item flex-row ${item.main && 'main'}`;
    }

    handleOnChange = (e: React.FormEvent<HTMLInputElement>): void => {

        this.setState(
            {
                searchValue: e.currentTarget.value
            },
            () => {
                if (this.state.searchValue) {
                    const newList = this.props.videoList.filter((item, key) => {
                        if (
                            (item.tags && fixText(item.tags).includes(fixText(this.state.searchValue)))
                            || fixText(item.name).includes(fixText(this.state.searchValue))

                        ) {
                            return item;
                        }
                    });
                    this.setState({
                        videoList: newList
                    });
                } else {
                    this.setState({
                        videoList: this.props.videoList
                    });
                }
            });

    }

    componentWillReceiveProps (nextProps:VideoListContainerProps) {
        if (hashCode(this.props.videoList) !== hashCode(nextProps.videoList)) {
            this.setState({
                searchValue: '',
                videoList: nextProps.videoList
            });
        }
    }

    render() {
        const {videoActive, setActiveVideo, isEditing} = this.props;
        return (
            <div className="list-component">
                <div className="search-area">
                    <i className="i-css i-search"></i>
                    <input type="text"
                           className="input-default"
                           placeholder="search"
                           value={this.state.searchValue}
                           onChange={this.handleOnChange}/>
                </div>
                {this.state.videoList.map((item:newListInterface, key:number) => {
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
                                {!item.main && isEditing ?
                                    <div className="edit-area">
                                        <a onClick={item.editVideo()}>{EDITOR_LABELS.EDIT}</a>
                                        <a onClick={item.deleteVideo()}>{EDITOR_LABELS.DELETE}</a>
                                    </div>
                                    : null}
                            </div>;
                })
                }
                {videoActive.isLoad &&
                    <div className="block-area">
                    </div>
                }
                <div className="clearfix"></div>
            </div>
        );
    }
}
