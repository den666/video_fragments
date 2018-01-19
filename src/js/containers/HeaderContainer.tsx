import {connect, Dispatch} from 'react-redux';
import HeaderView from '../components/HeaderView';
import {AppInterface} from '../initialState/initialStateInterface';
import {LAYOUT} from '../constants/appLabelsConstants';

interface stateProps {
    logo: string
}

interface dispatchProps {
}

const mapStateToProps = (state:AppInterface, ownProps: {}): stateProps => {
    return {
        logo: LAYOUT.HEADER_IMAGE
    };
};


const mapDispatchToProps = (dispatch:Dispatch<any>): dispatchProps => {
    return {

    };
};

const HeaderContainer = connect<stateProps, dispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(HeaderView);

export default HeaderContainer;

export type HeaderContainerProps = stateProps & dispatchProps;