import React, { Component } from 'react';
import { Paper, Typography, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {GRAB_ITEM, UPDATE_USER, ERROR_MESSAGES, EMPTY_ERRORS} from '../reducers/actions';
import axios from 'axios';
import AuthService from '../utils/AuthService';

const styles = themes => ({
    paper: {
        width: 800,
        height: "auto",
        padding: 10,
        paddingBottom: 30,
        marginTop: 100
    },
    btn: {
        width: 100,
        width: "auto",
        backgroundColor: "#009973",
        color: "white",
        padding: "10px 30px",
        border: "1px solid #009973",
        borderRadius: 5
    },
    text: {
        width: 500
    },
    inputText: {
        width: 500,
        border: "1px solid #ccc",
        borderRadius: 5,
        height: 50
    },
    heading: {
        color: "#009973",
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 10
    },
    link: {
        color: "#009973",
        marginTop: 10
    }
    
})

class OTP extends Component 
{
    auth = new AuthService();

    submitHandler = event => {
        event.preventDefault();
        const {email} = this.props.user;
        
        //Verify if the user entered OTP is valid or not
        axios.post('http://localhost:5000/verifyOTP', {email, token: this.props.otp})
        .then(response => {

            if(response.data.valid)
            {
                /**
                 *      If the OTP entered by the user is valid, store the token into the localStorage.
                 *      Fetch the user from the database and update the User into the Redux Store.
                 *      Move to the Dashboard page and empty the errors in the "ErrorMessages" array.
                 */
                const token = (this.props.location.state);
                localStorage.setItem('token', token);

                axios.post('http://localhost:5001/user', {email})
                        .then(res => {
                            let email = this.auth.getDecodedValue(token).email;
                            this.props.dispatch({type: EMPTY_ERRORS});
                            this.props.dispatch({type: UPDATE_USER, payload: {user: res.data}});
                            this.props.history.push('/dashboard');
                        });
            }
            else
            {
                /**
                 *      If the OTP is not valid, display the message to the user stating that it is invalid
                 *      and ask the user to enter it again.
                 */
                this.props.dispatch({type: ERROR_MESSAGES, payload:{message: "OTP verification failed. Please click on 'Resend OTP' link to try again"}})
            }
        })
    }

    onClickLink = event => {
        event.preventDefault();

        //Resend the OTP again to the User via email
        axios.post('http://localhost:5000/getOTP', {email: this.props.user.email})
        .then(res => {
            
        })
    }

    onChangeHandler = event => {
        //update the OTP into the redux store
        this.props.dispatch({type: GRAB_ITEM, payload: {value: event.target.value}});
    }

    render() { 
        const {classes} = this.props;

        return (
            <React.Fragment>
                <div align="center">
                    <Paper className={classes.paper}>
                        <Typography className={classes.heading}>Validate OTP</Typography>
                        <hr/>
                        <div>
                            {this.props.ErrorMessages ? this.props.ErrorMessages.map((message, index) => (
                                <div className="alert alert-danger alert-dismissible fade show">{message}</div>
                            )): null}
                        </div>
                        <Typography variant="h6">A One Time Passcode has been sent to {this.props.user.email}</Typography>
                        <br/>
                        <p>
                            Please enter the OTP below to verify. The OTP expires in 30 seconds.
                        </p>
                        <div className={classes.text}>
                            <div>
                                <input className={classes.inputText} type="text" name="otp" onChange={this.onChangeHandler} />
                            </div>
                            <br/>
                            <Grid container xs={12}>
                                <Grid item xs={6} align="left">
                                    <button className={classes.btn} onClick={this.submitHandler}>Validate OTP</button>
                                </Grid>
                                <Grid item xs={6} align="right" className={classes.link}>
                                    <button className={classes.btn} onClick={this.onClickLink}>Resend OTP</button>
                                </Grid>
                            </Grid>
                        </div>   
                    </Paper>
                </div>
            </React.Fragment>
          );
    }
}

const mapStateToProps = state => {
    return {...state};
}
 
export default compose(withStyles(styles), connect(mapStateToProps))(OTP);