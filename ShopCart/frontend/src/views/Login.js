import React, { Component } from 'react';
import CustomInputText from '../components/CustomInputText';
import CustomButton from '../components/CustomButton';
import { withStyles } from '@material-ui/core/styles';
import {Grid, Paper, Typography, Container, Link} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import {connect} from 'react-redux';
import {compose} from 'redux';
import AuthService from '../utils/AuthService';
import {UPDATE_USER, EMPTY_ERRORS, UPDATE_LOGIN_ERRORS, ERROR_MESSAGES} from '../reducers/actions';
import {UPDATE_USER_ITEM} from '../reducers/actions';

const styles = theme => ({
    paper: {
        margin: "0px",
        marginTop: "60px",
        padding: "10px",
        height: "auto",
        width: "500px",
        paddingBottom: 50
    },
    title: {
        color: "#009973",
        fontSize: 40,
        fontWeight: "bold",
        marginTop: 10
    }
})

class Login extends Component 
{
     componentWillMount() {
         
         const auth = new AuthService();
         
         //Check whether the user is authenticated and if yes then redirect him to the "Dashboard" page
         if(auth.isAuthenticated()) {
             this.props.history.push('/dashboard');
         }
         this.props.dispatch({type: EMPTY_ERRORS});
     }

     onChangeHandler = event => {
        const {name, value} = event.target;
        this.props.dispatch({type: UPDATE_USER_ITEM, payload: {name, value}});
     }

     onSubmitHandler = event => {
        event.preventDefault(); //preventing the re-rendering of login page
        this.props.dispatch({type: EMPTY_ERRORS});
        const {email, password} = this.props.user;


        if(email === '')
        {
            this.props.dispatch({type: UPDATE_LOGIN_ERRORS, payload: {index: 0, message: "This field is required"}});
        }
        else if(email !== '')
        {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!re.test(email))
            {
                this.props.dispatch({type: UPDATE_LOGIN_ERRORS, payload: {index: 0, message: "Please enter a valid email address"}});
            }
        }

        if(password === '')
        {
            this.props.dispatch({type: UPDATE_LOGIN_ERRORS, payload: {index: 1, message: "This field is required"}});
        }
        else if(password !== '')
        {
            var regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
            if(!regex.test(password))
            {
                this.props.dispatch({type: UPDATE_LOGIN_ERRORS, payload: {index: 1, message: "Please enter a valid password"}});
            }
                    
        }

        //Set a timeout of 500ms so that the redux store could get updated
        setTimeout(() => {
            if(!this.props.errorIndicator)
            {
                axios.post('http://localhost:5001/login', {
                email : this.props.user.email,
                password: this.props.user.password
            })
            .then(response => {
                if(response.data === "Error" || response.date === "Error in signing the token"){
                    this.props.dispatch({type: ERROR_MESSAGES, payload: {message: "Please enter the correct credentials"}})
                }
                else 
                {
                    const {token, twoFactor} = response.data;

                    /**
                     *      If the two step authentication is enabled by the user then redirect him to "request OTP" page
                     *      otherwise store the token into localStorage, update the user and redirect him to "Dashboard"
                     */
                    if(twoFactor || twoFactor === 1)
                    {
                        this.props.history.push('/requestOTP',token);
                        axios.post('http://localhost:5000/getOTP', { email:this.props.user.email })
                        .then(response => {
                        })
                    }
                    else
                    {
                        const auth = new AuthService();
                        let email = auth.getDecodedValue(token).email;
                        localStorage.setItem('token', token);
                        
                        //update the user object
                        axios.post('http://localhost:5001/user', {email})
                        .then(res => {
                            this.props.dispatch({type: UPDATE_USER, payload: {user: res.data}});
                            this.props.history.push('/dashboard');
                        });
                    }
                }
            });
            }
            }, 500);
     }

    render() { 
        const {classes} = this.props;
        return (
            <Container Component="main" maxWidth="sm">
                <Paper className={classes.paper} elevation={3}>
                    <br />
                    <div>
                        <Avatar style={{marginLeft:"220px"}} src="/broken-image.jpg" />
                        <br/>
                        <Typography variant="h5" align="center" className={classes.title}>
                            Sign In
                        </Typography>
                        <br />
                        {this.props.ErrorMessages ? this.props.ErrorMessages.map((mess, index) => <div key={index} className="alert alert-danger alert-dismissible fade show">{mess}
                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                        </div>) : null}
                        <br/>
                        <Grid container spacing={3} sm justify="center">
                            <Grid item sm={12} >
                                <CustomInputText 
                                    name="email" 
                                    type="email" 
                                    label="Username" 
                                    onChange={this.onChangeHandler} 
                                    fullWidth
                                    required
                                    error={this.props.loginErrors[0].display}
                                    helperText={this.props.loginErrors[0].message}
                                       />
                            </Grid>
                            <label className="txt txt-danger"></label>
                            <Grid item sm={12} >
                                <CustomInputText 
                                    name="password" 
                                    type="password" 
                                    label="Password" 
                                    onChange={this.onChangeHandler} 
                                    fullWidth
                                    required
                                    error={this.props.loginErrors[1].display}
                                    helperText={this.props.loginErrors[1].message} />
                            </Grid>
                            <Grid item sm={12} align="center">
                                <CustomButton name="Login" fullWidth="true" onSubmit={this.onSubmitHandler} /><br/>
                            </Grid>
                            <Grid item sm={12} align="center">
                                <a href="http://localhost:5005/auth/google"><CustomButton name="Continue with Google" fullWidth="true" /><br/></a>
                            </Grid>
                            <Grid item sm={12} align="center">
                                <a href="http://localhost:5005/auth/facebook"><CustomButton name="Continue with Facebook" fullWidth="true" /><br/></a>
                            </Grid>
                        </Grid>
                        <br/>
                        <Grid container xs>
                            <Grid item xs={12}>
                                <Link href="/forgot_password" style={{marginLeft:"170px"}} color="primary">Forgot Password ?</Link>
                            </Grid>
                            <Grid item xs={12}>
                                <Link href="/register"  style={{marginLeft:"120px"}} color="primary">Don't have an account? Sign Up</Link>
                            </Grid>
                        </Grid>
                    </div>
                </Paper>
            </Container>
          )
    }
}

const mapStateToProps = state => {
    return state;
}

export default compose(connect(mapStateToProps),withStyles(styles),)(Login);