import React, { Component } from 'react';
import CustomInputText from '../components/CustomInputText';
import CustomSelect from '../components/CustomSelect';
import CustomButton from '../components/CustomButton';
import { withStyles } from '@material-ui/core/styles';
import {Grid, Paper, Typography, Container} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import {questions} from '../store/forgotpwd';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import axios from 'axios';
import { ERROR_MESSAGES, UPDATE_REG_ERRORS, EMPTY_ERRORS, UPDATE_USER_ITEM } from '../reducers/actions';
import {compose} from 'redux';
import {connect} from 'react-redux';

const styles = theme => ({
    paper: {
        margin: "0px",
        marginTop: "60px",
        padding: "10px",
        height: "auto",
        width: "600px",
        paddingBottom: "70px"
    },
    heading: {
        marginTop: "20px"
    }
})

class ForgotPassword extends Component 
{
    componentWillMount() 
    {
        this.props.dispatch({type: EMPTY_ERRORS});
    }

     onChangeHandler = event => {
        const{name, value} = event.target;
        this.props.dispatch({type: UPDATE_USER_ITEM, payload: {name, value}});
     }

     onSubmitHandler = event => {
        event.preventDefault();
        
        const { email, question1, question2, answer1, answer2 } = this.props.user;

        if(email === ''){
            this.props.dispatch({type: UPDATE_REG_ERRORS, payload: {index: 0, message: "Email is required"}})
        }

        if(question1 === ''){
            this.props.dispatch({type: ERROR_MESSAGES, payload: {message: "Please select Question 1"}});
        }
        
        if(answer1 === ''){
            this.props.dispatch({type: UPDATE_REG_ERRORS, payload: {index: 1, message: "Answer 1 is required"}});
        }

        if(question2 === ''){
            this.props.dispatch({type: ERROR_MESSAGES, payload: {message: "Please select Question 2"}});
        }

        if(answer2 === ''){
            this.props.dispatch({type: UPDATE_REG_ERRORS, payload: {index: 2, message: "Answer 2 is required"}});
        }

        setTimeout(() => {
            if(!this.props.errorIndicator)
            {
                /**
                 *      Check if the reset question and answer selected are correct. If yes then redirect to "Reset Password"
                 *      component else display an error message
                 */
                axios.post('http://localhost:5001/forgotpwd', {
                email: email,
                question_1: question1,
                answer_1: answer1,
                question_2: question2,
                answer_2: answer2
                })
                .then(response => {
                    if(response.data === "Valid question and answer")
                    {
                        this.props.history.push("/reset_password");
                    }   
                    else
                    {
                        this.props.dispatch({type: ERROR_MESSAGES, payload: {message: response.data}});
                    }
                })
            }
        }, 200);
        
     }


    render() { 
        const {classes} = this.props;
        return ( 
            <Container Component="main" maxWidth="sm">
                <Paper className={classes.paper} elevation={3}>
                    <br />
                    <div>
                        <div align="center">
                            <Avatar >
                                <LockOpenIcon />
                            </Avatar>
                            <br/>
                            <Typography variant="h5" align="center" color="primary">
                                Account Security
                            </Typography>
                        </div>
                        <hr />
                        <br/>
                        {this.props.ErrorMessages ? this.props.ErrorMessages.map((mess, index) => <div key={index} className="alert alert-danger alert-dismissible fade show">{mess}
                        </div>) : null}
                        <br/>
                        <form>
                            <Grid container spacing={3}>
                                <Grid item sm={12} >
                                    <CustomInputText name="email" label="Email" onChange={this.onChangeHandler} style={{width:"422px"}} error={this.props.registerErrors[0].display} helperText={this.props.registerErrors[0].message} />
                                </Grid>
                                <Grid item sm={12} style={{marginLeft: "80px"}}>
                                    <CustomSelect name="question1" label="Secret Question 1" style={{width:"422px"}} onChange={this.onChangeHandler} questions={questions} />
                                </Grid>
                                <Grid item sm={12}>
                                    <CustomInputText name="answer1" label="Your Answer" style={{width:"422px"}} onChange={this.onChangeHandler} fullWidth error={this.props.registerErrors[1].display} helperText={this.props.registerErrors[1].message} />
                                </Grid>
                                <Grid item sm={12} style={{marginLeft: "80px"}}>
                                    <CustomSelect name="question2" label="Secret Question 2" style={{width:"422px"}} onChange={this.onChangeHandler} questions={questions} />
                                </Grid>
                                <Grid item sm={12}>
                                    <CustomInputText name="answer2" label="Your Answer" style={{width:"422px"}} onChange={this.onChangeHandler} fullWidth error={this.props.registerErrors[2].display} helperText={this.props.registerErrors[2].message} />
                                </Grid>
                                <Grid item sm={12} align="center">
                                    <CustomButton name="Submit" onSubmit={this.onSubmitHandler} fullWidth="true" style={{width:"422px", height: "50px"}} />
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Paper>
            </Container>
         );
    }
}

const mapStateToProps = state => {
    return {...state};
}
 
export default compose(connect(mapStateToProps),withStyles(styles))(ForgotPassword);