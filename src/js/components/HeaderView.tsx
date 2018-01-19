import * as React from 'react';

import {HeaderContainerProps} from '../containers/HeaderContainer';


export default class HeaderView extends React.Component<HeaderContainerProps, any> {
    constructor(props:HeaderContainerProps) {
        super(props);
    }
    render() {
        const {logo} = this.props;
        return (
            <header className="width-100 flex-row">
                <div className="flex-row flex-middle width-100">
                    <div className="left flex-1 p-t p-l p-b"><img src={logo} alt=""/></div>
                    <div className="right-align p-r">
                        <h1 className="size-h3 text-primary m-b-none">
                            JOBSITY<span className="light">CHALLENGE</span>
                        </h1>
                        <div className="small text-gray">dennis espinoza | FrontEnd-Developer and Designer</div>
                    </div>
                </div>
            </header>
        );
    }
}
