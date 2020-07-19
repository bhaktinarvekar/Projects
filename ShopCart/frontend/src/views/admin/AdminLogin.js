import React, { Component } from 'react';
import CustomInputText from '../../components/CustomInputText';
import CustomButton from '../../components/CustomButton';
import { withStyles } from '@material-ui/core/styles';
import {Grid, Paper, Typography, Container, Link} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import {connect} from 'react-redux';
import {compose} from 'redux';
import AuthService from '../../utils/AuthService';
import {UPDATE_USER, EMPTY_ERRORS, UPDATE_LOGIN_ERRORS, ERROR_MESSAGES} from '../../reducers/actions';
import {UPDATE_USER_ITEM} from '../../reducers/actions';

const styles = theme => ({
    paper: {
        margin: "0px",
        marginTop: "60px",
        padding: "10px",
        height: "600px",
        width: "500px"
    },
    heading: {
        marginTop: "20px"
    },
    button: {
        marginLeft: "500px"
    }
})

class AdminLogin extends Component 
{
    componentWillMount() 
    {
        const auth = new AuthService();

        //If the user is authenticated then redirect to the admin dashboard
        if(auth.isAuthenticated()) {
            this.props.history.push('/admin/dashboard');
        }
        this.props.dispatch({type: EMPTY_ERRORS});
       
    }

    //Manage the user state when the user enters into the login form
    onChangeHandler = event => {
       const {name, value} = event.target;
       this.props.dispatch({type: UPDATE_USER_ITEM, payload: {name, value}});
    }

    onSubmitHandler = event => {
       event.preventDefault(); //preventing the re-rendering of page
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
                   const {role, token} = response.data;
                   
                   /**
                    *      Check if the user has admin privilege then set the token into the localStorage and update the user and
                    *      redirect it to the admin dashboard page else display an error.
                    */
                   if(role === 'admin')
                   {
                        const auth = new AuthService();
                        let email = auth.getDecodedValue(token).email;
                        localStorage.setItem('token', token);
                        
                        axios.post('http://localhost:5001/user', {email})
                        .then(res => {
                            this.props.dispatch({type: UPDATE_USER, payload: {user: res.data}});
                            this.props.history.push('/admin/dashboard');
                        });
                   }
                   else
                   {
                        this.props.dispatch({type: ERROR_MESSAGES, payload: {message: "Please login with the correct credentials"}})
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
                        </Grid>
                        <br/>
                        <Grid container xs>
                            <Grid item xs={12}>
                                <Link href="/forgot_password" style={{marginLeft:"170px"}} color="primary">Forgot Password ?</Link>
                            </Grid>
                            <Grid item xs={12}>
                                <Link href="/admin/register"  style={{marginLeft:"120px"}} color="primary">Don't have an account? Sign Up</Link>
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
 
export default compose(withStyles(styles), connect(mapStateToProps))(AdminLogin);