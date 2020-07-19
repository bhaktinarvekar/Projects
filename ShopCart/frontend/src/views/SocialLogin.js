import React, { Component } from 'react';
import AuthService from '../utils/AuthService';
import axios from 'axios';
import {UPDATE_USER} from '../reducers/actions';
import {connect} from 'react-redux';


/**
 *      Once the login is successful through the OAuth, the token is created and send to the SocialLogin Component
 */
class SocialLogin extends Component 
{
    auth = new AuthService();

    componentWillMount() {

        //fetch the token and decode it to fetch the email
        const token = (this.props.location.search).split('=')[1];
        let email = this.auth.getDecodedValue(token).email;

        //Fetch the user from the database and update the user object into the redux Store
        axios.post('http://localhost:5001/user', {email})
        .then(response => {
            this.props.dispatch({type: UPDATE_USER, payload: {user: response.data}});
            

            /**
             *      Check whether the user has enabled the "Two Factor Authentication".
             *      If yes, then send an email to the user with an OTP else store the token into the localStorage and 
             *      redirect to the Dashboard
            */
            
            if(response.data.two_factor || response.data.two_factor === 1)
            {
                axios.post('http://localhost:5000/getOTP', {email})
                .then(res => {
                });
                this.props.history.push('/requestOTP',token);
            }
            else
            {
                this.props.dispatch({type: UPDATE_USER, payload: {user: response.data}});
                localStorage.setItem('token', token);
                this.props.history.push('/dashboard');
            }
        });   
    }
    
    render() { 
        return ( 
            <React.Fragment>

            </React.Fragment>
         );
    }
}

const mapStateToProps = state => {
    return state;
}
 
export default connect(mapStateToProps)(SocialLogin);