import * as React from 'react';
import {ModalContainerProps} from '../containers/ModalContainer';
import EditorView from './EditorView';

export default class ModalView extends React.Component<ModalContainerProps, any> {
    constructor(props:ModalContainerProps) {
        super(props);
    }

    render() {
        const {mainVideo, show} = this.props;
        return (
            <div className={`${show ? 'active' : ''} editor width-100 height-100`}>
                {show &&
                    <EditorView {...this.props}/>
                }
            </div>
        );
    }
}