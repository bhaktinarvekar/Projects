import React, { Component } from 'react';
import CustomInputText from '../components/CustomInputText';
import CustomSelect from '../components/CustomSelect';
import CustomButton from '../components/CustomButton';
import { withStyles } from '@material-ui/core/styles';
import {Grid, Paper, Typography, Container, Link} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import {questions} from '../store/forgotpwd';
import axios from 'axios';
import {UPDATE_USER_ITEM, UPDATE_REG_ERRORS, ERROR_MESSAGES, EMPTY_ERRORS} from '../reducers/actions';
import {connect} from 'react-redux';
import {compose} from 'redux';

const styles = themes => ({
    paper: {
        marginTop: "20px",
        padding: "10px",
        height: "auto",
        width: "600px",
        paddingBottom: 50
    },
    heading: {
        marginTop: "20px"
    },
    container: {
        marginLeft: "450px"
    },
    title: {
        color: "#009973",
        fontSize: 40,
        fontWeight: "bold",
        marginTop: 20
    }
})

class Registration extends Component {

    //Update the user details on entering the data
     onChangeHandler = event => {
         const { name, value } = event.target;
         this.props.dispatch({type: UPDATE_USER_ITEM, payload: {name, value}});
     }

     onSubmitHandler = event => {
         event.preventDefault();

         //remove all the previous errors from the database
         this.props.dispatch({type: EMPTY_ERRORS});

        const {firstname, lastname, email, password, cpassword, address, city, state, pincode, question1, answer1, question2, answer2,
            phone} = this.props.user;

        if(firstname === '')
        {
            this.props.dispatch({type: UPDATE_REG_ERRORS, payload: {index: 0, message: "First Name is required"}});
        }

        if(lastname === '')
        {
            this.props.dispatch({type: UPDATE_REG_ERRORS, payload: {index: 1, message: "Last Name is required"}});
        }

        if(email === '')
        {
            this.props.dispatch({type: UPDATE_REG_ERRORS, payload: {index: 2, message: "Email ID is required"}});
        }
        else{
            var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/igm;
            if(!re.test(email))
            {
                this.props.dispatch({type: UPDATE_REG_ERRORS, payload: {index: 2, message: "Please enter a valid email address"}});
            }
        }

        if(password === '')
        {
            this.props.dispatch({type: UPDATE_REG_ERRORS, payload: {index: 3, message: "Mobile Number is required"}});
        }

        if(password === '')
        {
            this.props.dispatch({type: UPDATE_REG_ERRORS, payload: {index: 4, message: "Password is required"}});
        }
        else if(password !== '')
        {
            var regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
                if(!regex.test(password))
                {
                    this.props.dispatch({type: UPDATE_REG_ERRORS, payload: {index: 4, message: "Please enter a valid password"}});
                }
        }

        if(cpassword === '')
        {
            this.props.dispatch({type: UPDATE_REG_ERRORS, payload: {index: 5, message: "This field is required"}});
        }

        if(address === '')
        {
            this.props.dispatch({type: UPDATE_REG_ERRORS, payload: {index: 6, message: "Address is required"}});
        }

        if(city === '')
        {
            this.props.dispatch({type: UPDATE_REG_ERRORS, payload: {index: 8, message: "City is required"}});
        }

        if(state === '')
        {
            this.props.dispatch({type: UPDATE_REG_ERRORS, payload: {index: 7, message: "State is required"}});
        }

        if(pincode === '')
        {
            this.props.dispatch({type: UPDATE_REG_ERRORS, payload: {index: 9, message: "Pincode is required"}});
        }

        if(question1 === '')
        {
            this.props.dispatch({type: UPDATE_REG_ERRORS, payload: {index: 10, message: "Question 1 is required"}});
        }

        if(question2 === '')
        {
            this.props.dispatch({type: UPDATE_REG_ERRORS, payload: {index: 12, message: "Question 2 is required"}});
        }

        if(answer1 === '')
        {
            this.props.dispatch({type: UPDATE_REG_ERRORS, payload: {index: 11, message: "Answer 1 is required"}});
        }

        if(answer2 === '')
        {
            this.props.dispatch({type: UPDATE_REG_ERRORS, payload: {index: 13, message: "Answer 2 is required"}});
        }

        if(password !== cpassword)
        {
            this.props.dispatch({type: ERROR_MESSAGES, payload: {message: "Password and Confirm Password does not match"}})
        }

        if(question1 === question2 && question1 !== '' && question2 !== '')
        {
            this.props.dispatch({type: ERROR_MESSAGES, payload: {message: "Please select a different Security Question"}})
        }

        // set a timeout of 500ms so that the errors and errorIndicator gets updated into the redux Store
        setTimeout(() => {
            if(!this.props.errorIndicator)
            {
                axios.post('http://localhost:5000/register', {
                    "email" : email,
                    "firstname" : firstname,
                    "lastname" : lastname,
                    "password" : password,
                    "address": address,
                    "city": city,
                    "state": state,
                    "pincode": pincode,
                    "question1": question1,
                    "answer1": answer1,
                    "question2": question2,
                    "answer2": answer2,
                    "phone": phone,
                    "role": "user"
                })
                .then(res => {
                    if(res.data === "Username already exists")
                    {
                        this.props.dispatch({type: ERROR_MESSAGES, payload: {message: "Username already exists"}})
                    }
                    else{
                        
                        // If the registration is success then move to the Registration Success page
                        this.props.history.push('/handle_registeration');
                    }
                    
                });
            }
        }, 500);
     }

     componentWillMount() {
        this.props.dispatch({type: EMPTY_ERRORS});
     }

    render() { 
        const { classes, registerErrors, ErrorMessages } = this.props;
        return ( 
            <Container className={classes.container} Component="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                    <br />
                    <div>
                        <Avatar style={{marginLeft:"270px"}}>
                            <LockOpenIcon />
                        </Avatar>
                        <Typography variant="h5" align="center" className={classes.title}>
                            Sign Up
                        </Typography>
                        <br />
                        {ErrorMessages ? ErrorMessages.map((mess, index) => <div className="alert alert-danger alert-dismissible fade show">{mess}
                        </div>) : null}
                        <br/>
                        <form>
                            <Grid container spacing={3}>
                                <Grid item xs={5} sm={4}>
                                    <CustomInputText label="First Name" name="firstname" style={{width:"195px"}} onChange={this.onChangeHandler} error={registerErrors[0].display} helperText={registerErrors[0].message}/>
                                </Grid>
                                <Grid item xs={5} sm={4} >
                                    <CustomInputText label="Last Name" name="lastname" style={{width:"220px"}} onChange={this.onChangeHandler} error={registerErrors[1].display} helperText={registerErrors[1].message} />
                                </Grid>
                                <Grid item sm={12} >
                                    <CustomInputText label="Email" name="email" style={{width:"422px"}} onChange={this.onChangeHandler} error={registerErrors[2].display} helperText={registerErrors[2].message} />
                                </Grid>
                                <Grid item sm={12} >
                                    <CustomInputText label="Mobile Number" name="phone" style={{width:"422px"}} onChange={this.onChangeHandler} error={registerErrors[3].display} helperText={registerErrors[3].message} />
                                </Grid>
                                <Grid item sm={12} >
                                    <CustomInputText label="Password" type="password" name="password" style={{width:"422px"}} onChange={this.onChangeHandler} error={registerErrors[4].display} helperText={registerErrors[4].message} />
                                </Grid>
                                <Grid item sm={12} >
                                    <CustomInputText label="Confirm Password" type="password" name="cpassword" style={{width:"422px"}} onChange={this.onChangeHandler} error={registerErrors[5].display} helperText={registerErrors[5].message} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} >
                                    <CustomInputText label="Address" name="address" style={{width:"422px"}} onChange={this.onChangeHandler} error={registerErrors[6].display} helperText={registerErrors[6].message} />
                                </Grid>
                                    <Grid item>
                                        <CustomInputText label="State" name="state" style={{width:"422px"}} onChange={this.onChangeHandler} error={registerErrors[7].display} helperText={registerErrors[7].message} />
                                    </Grid>
                                    <Grid item xs={5} sm={4}>
                                        <CustomInputText label="City" name="city" style={{width:"195px"}}  onChange={this.onChangeHandler} error={registerErrors[8].display} helperText={registerErrors[8].message}/>
                                    </Grid>
                                    <Grid item xs={5} sm={4}>
                                        <CustomInputText label="Pincode" name="pincode" style={{width:"220px"}}  onChange={this.onChangeHandler} error={registerErrors[9].display} helperText={registerErrors[9].message} />
                                    </Grid>
                                    <Grid item sm={12} style={{marginLeft: "80px"}}>
                                        <CustomSelect name="question1" label="Secret Question 1" style={{width:"422px"}} questions={questions} onChange={this.onChangeHandler} error={registerErrors[10].display} helperText={registerErrors[10].message} />
                                    </Grid>
                                    <Grid item sm={12}>
                                        <CustomInputText name="answer1" label="Your Answer" style={{width:"422px"}} fullWidth onChange={this.onChangeHandler} error={registerErrors[11].display} helperText={registerErrors[11].message} />
                                    </Grid>
                                    <Grid item sm={12} style={{marginLeft: "80px"}}>
                                        <CustomSelect name="question2" label="Secret Question 2" style={{width:"422px"}} questions={questions} onChange={this.onChangeHandler} error={registerErrors[12].display} helperText={registerErrors[12].message} />
                                    </Grid>
                                    <Grid item sm={12}>
                                        <CustomInputText name="answer2" label="Your Answer" style={{width:"422px"}} fullWidth onChange={this.onChangeHandler} error={registerErrors[13].display} helperText={registerErrors[13].message} />
                                    </Grid>
                                <Grid item sm={12} align="center">
                                    <CustomButton name="Register" style={{width:"422px"}} onSubmit={this.onSubmitHandler}/>
                                </Grid>
                            </Grid>
                        </form>
                        <br/>
                        <Grid container xs>
                            <Grid item xs={12}>
                                <Link href="/login"  style={{marginLeft:"170px"}} color="primary">Already have an account? Sign In</Link>
                            </Grid>
                        </Grid>
                    </div>
                </Paper>
            </Container>
         );
    }
}

const mapStateToProps = state => {
    return state;
}

export default compose(withStyles(styles), connect(mapStateToProps))(Registration);