import React, { Component } from 'react';
import {connect} from 'react-redux';
import {REMOVE_USER} from '../reducers/actions';

class Logout extends Component {
    
    componentWillMount() {

        const items = ['token', 'state'];
        
        this.props.dispatch({type: REMOVE_USER});
        localStorage.removeItem('token');
        localStorage.removeItem('state');
        window.localStorage.clear();
        this.props.history.push('login');
    }

    render() {
        return (
            <React.Fragment>
            </React.Fragment>
        )
    }
    
}

const mapStateToProps = state => {
    return state;
}
 
export default connect(mapStateToProps)(Logout);