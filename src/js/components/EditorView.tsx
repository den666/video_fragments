import * as React from 'react';
import {ModalContainerProps} from '../containers/ModalContainer';
import RangeComponent from '../components/generic/RangeComponent';
import {EDITOR_LABELS} from '../constants/appLabelsConstants';
import {toDateString} from '../utils/dateUtils';
import {hashCode} from '../utils/stringUtils';

export default class ModalView extends React.Component<ModalContainerProps, any> {
    constructor(props:ModalContainerProps) {
        super(props);
        this.state = {
            videoDuration: 0,
            start: null,
            end: null,
            cursorVideo: null,
            showError: false,
            name: '',
            tags: '',
            id: null
        };
    }

    setValue = (id:string, value: string | number) => {
        const editorVideoItem:any = document.getElementById('editorVideo');
        editorVideoItem.pause();
        editorVideoItem.currentTime = value;
        this.setState({
            [id]: value,
            cursorVideo: toDateString(value)
        });
    }

    getVideoData = () => {
        const editorVideoItem:any = document.getElementById('editorVideo');
        if (editorVideoItem.readyState) {
            editorVideoItem.autoplay = true;
            this.setState({
                videoDuration: parseInt(editorVideoItem.duration, 0)
            });
            document.getElementById('editorVideo').removeEventListener('durationchange', this.getVideoData);
        }
    }

    saveDate = () => {
        if (!this.state.name || !(this.state.start || this.state.end)) {
            this.setState({
                showError: true
            });
        } else {
            if (!this.state.id) {
                const data = {
                    id: hashCode(this.state.name + Date.now()),
                    url: this.props.mainVideo.url,
                    name: this.state.name,
                    main: false,
                    start: +(this.state.start || '0'),
                    end: +(this.state.end || this.state.videoDuration),
                    tags: this.state.tags
                };
                this.props.saveVideo(data);
            }
        }
    }

    setData = (id:string, value:string) => {
        this.setState({
            [id]: value
        });
    }

    getNewVideo = () => {
        let lapse = '';
        if (this.state.start && !this.state.end) {
            lapse = `#t=${toDateString(this.state.start)},00:00`;
        }
        if (this.state.end && !this.state.start) {
            lapse = `#t=00:00,${toDateString(this.state.end)}`;
        }
        if (this.state.end && this.state.start) {
            lapse = `#t=${toDateString(this.state.start)},${toDateString(this.state.end)}`;
        }
        return this.props.mainVideo.url + lapse;
    }

    componentDidMount () {
        document.getElementById('editorVideo').addEventListener('durationchange', this.getVideoData);
    }

    render() {
        const {mainVideo, closeEdit} = this.props;
        return (
                <div className="modal-container m-t m-b">
                    <div className="header p-all">
                        <h1 className="text-primary size-h4 capitalize light left">
                            {EDITOR_LABELS.ADD_NEW_FRAGMENT}
                        </h1>
                        <a onClick={() => closeEdit()} className="right m-t pointer">
                            <i className="i-css i-close"></i>
                        </a>
                        <div className="clearfix"></div>
                    </div>
                    <div className="content p-all">
                        <video ref="mainVideo" id="editorVideo" controls preload="metadata" width="100%">
                            <source
                                src={this.getNewVideo()}/>
                        </video>
                        <div>
                            <div className="text-primary inline-block light p-r m-l-lg label-input truncate">
                                {EDITOR_LABELS.NAME}:
                            </div>
                            <input className="input-default"
                                   value={this.state.name}
                                   onChange={e => this.setData('name', e.currentTarget.value)} type="text"/>
                        </div>
                        <div>
                            <div className="text-primary inline-block light p-r m-l-lg label-input truncate">
                                {EDITOR_LABELS.TAGS}:
                            </div>
                            <input className="input-default"
                                   value={this.state.tags}
                                   onChange={e => this.setData('tags', e.currentTarget.value)} type="text"/>
                        </div>
                        <div className="range-container">
                            <RangeComponent
                                setValue={this.setValue}
                                start={this.state.start}
                                end={this.state.end}
                                videoDuration={this.state.videoDuration}/>
                        </div>
                    </div>
                    <div className="footer right-align p-all">
                        {this.state.showError &&
                        <div className="small text-warning p-b">
                            {EDITOR_LABELS.ERROR}
                        </div>
                        }
                        <a onClick={this.saveDate} className="btn-defaul">{EDITOR_LABELS.SAVE}</a>
                    </div>
                </div>
        );
    }
}
