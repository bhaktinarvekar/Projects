import React, { Component } from 'react';
import CustomInputText from '../components/CustomInputText';
import CustomButton from '../components/CustomButton';
import { withStyles } from '@material-ui/core/styles';
import {Grid, Paper, Typography, Container} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import axios from 'axios';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { UPDATE_REG_ERRORS, UPDATE_USER_ITEM, ERROR_MESSAGES, EMPTY_ERRORS } from '../reducers/actions';

const styles = theme => ({
    paper: {
        margin: "0px",
        marginTop: "60px",
        padding: "10px",
        height: "700px",
        width: "500px"
    },
    heading: {
        marginTop: "20px"
    }
})

class ResetPassword extends Component {
   
    componentWillMount() {
        //Remove all the previous errors
        this.props.dispatch({type: EMPTY_ERRORS}) 
    }

     onChangeHandler = event => {
         const { name, value } = event.target;

        //update the user item
        this.props.dispatch({type: UPDATE_USER_ITEM, payload: {name, value}});
     }

     onSubmitHandler = event => {
         event.preventDefault();

        //Remove all the previous errors
        this.props.dispatch({type: EMPTY_ERRORS});

        const { email, password, cpassword } = this.props.user;

        if(email === '')
        {
            this.props.dispatch({type: UPDATE_REG_ERRORS, payload: {index: 0, message: "Email is required"}});
        }

        if(password === '')
        {
            this.props.dispatch({type: UPDATE_REG_ERRORS, payload: {index: 1, message: "Password is required"}});
        }

        if(cpassword === '')
        {
            this.props.dispatch({type: UPDATE_REG_ERRORS, payload: {index: 2, message: "Confirm Password is required"}});
        }

        if(password !== '')
        {
            var regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
            if(!regex.test(password))
            {
                this.props.dispatch({type: UPDATE_REG_ERRORS, payload: {index: 0, message: "Please enter a valid password"}});
            }
        }

        // Set a timeout of 1s so that the above error messages and errorIndicator gets updated into the Redux Store
        setTimeout(() => {
            if(!this.props.errorIndicator)
            {
                if(password !== cpassword)
                {
                    this.props.dispatch({type: ERROR_MESSAGES, payload: {message: "Password and Confirm Password does not match"}})
                }

                /**
                 *      If there are no Error Messages then update the new password into the database and redirect to the Login page
                 */
                if(this.props.ErrorMessages.length <= 0)
                {
                    axios.post('http://localhost:5001/resetpwd', {
                        email: email,
                        pass: password
                    })
                    .then(response => {
                        if(response.data === "Password reset successfully")
                        {
                            this.props.history.push("/login");
                        }
                    })
                }
            }
        }, 1000);
     }


    render() { 
        const {classes} = this.props;
        return ( 
            <Container Component="main" maxWidth="sm">
                <Paper className={classes.paper} elevation={3}>
                    <br />
                    <div>
                        <br/>
                        <Avatar style={{marginLeft:"220px"}} >
                            <VpnKeyIcon />
                        </Avatar><br/>
                        <Typography variant="h5" align="center" color="primary">
                            Recover Password
                        </Typography>
                        <hr />
                        <br/>
                        {this.props.ErrorMessages ? this.props.ErrorMessages.map((mess, index) => <div className="alert alert-danger alert-dismissible fade show">{mess}
                        </div>) : null}
                        <br/>
                        <Grid container spacing={3} sm justify="center">
                            <Grid item sm={12} >
                                <CustomInputText name="email" label="Email" fullWidth required onChange={this.onChangeHandler} error={this.props.registerErrors[0].display} helperText={this.props.registerErrors[0].message} value={this.props.user.email} />
                            </Grid>
                            <Grid item sm={12}>
                                <CustomInputText name="password" label="New Password" type="password" fullWidth required onChange={this.onChangeHandler} error={this.props.registerErrors[1].display} helperText={this.props.registerErrors[1].message} value={this.props.user.password}/>
                            </Grid>
                            <Grid item sm={12}>
                                <CustomInputText name="cpassword" label="Confirm New Password" type="password" required fullWidth onChange={this.onChangeHandler} error={this.props.registerErrors[2].display} helperText={this.props.registerErrors[2].message} value={this.props.user.cpassword}/>
                            </Grid>
                            <Grid item sm={12} align="center">
                                <CustomButton name="Reset Password" fullWidth="true" onSubmit={this.onSubmitHandler} />
                            </Grid>
                        </Grid>
                    </div>
                </Paper>
            </Container>
         );
    }
}

const mapStateToProps = state => {
    return {...state};
}
 
export default compose(connect(mapStateToProps), withStyles(styles))(ResetPassword);