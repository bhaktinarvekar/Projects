import React, { Component } from 'react';
import { Grid, Paper, Typography, Switch } from '@material-ui/core';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {UPDATE_EDIT, UPDATE_USER_ITEM, UPDATE_USER, CHANGE_STEP, TOGGLE_CHANGE} from '../reducers/actions';
import CustomAppBar from '../components/CustomAppBar';

const styles = themes => ({
    paper: {
        width: 700,
        height: "auto",
        padding: 20,
        paddingBottom: 50,
        marginTop: -110
    },
    paperStep: {
        width: 700,
        height: "auto",
        padding: 20,
        paddingBottom: 50,
    },
    heading: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#009973"
    },
    inputText: {
        marginLeft: 10,
        width: 300,
        border: "1px solid #ccc",
        borderRadius: 5,
        height: 40
    },
    typo_head: {
        fontSize: 20,
        color: "#009973",
        fontWeight: "bold"
    },
    typo: {
        fontSize: 18,
        color: "grey",
    },
    btn: {
        backgroundColor: "#009973",
        width: 100,
        padding: 5,
        color: "white",
        marginRight: 10,
        border: "1px solid #009973"
    },
    column: {
    },
    column1: {
        width: "40%",
        margin: 0,
        marginTop: 150
    },
    column2: {
        width: "50%",
        margin: 0,
        marginLeft: "30%",
        marginTop: "-140px"
    },
    hsubtab: {
        width: "300px",
        height: 50,
        color: "white",
        backgroundColor: "#009973",
        borderRadius: 15,
        padding: 10,
        margin: 10,
        marginLeft: 50,
        cursor: "pointer"
    },
    img: {
        marginLeft: "0px",
        width: 380,
        height: 200,
        marginTop: 0
    }
})

class MyProfile extends Component {

    onEditHandler = event => {
        this.props.dispatch({type: UPDATE_EDIT});
    }

    onSaveHandler = event => {
        /**
         *      Save the updated information of the user into the database
         */
        axios.post('http://localhost:5000/updateUser', {user: this.props.user})
        .then(response => {
            //change the contents of the page into non-editable mode
            this.props.dispatch({type: UPDATE_EDIT});
        })
    }

    onChangeHandler = event => {
        this.props.dispatch({type: UPDATE_USER_ITEM, payload: {name: event.target.name, value: event.target.value}});
    }

    onToggleChange = event => {
        //Update the state for "2 step authentication"
        this.props.dispatch({type: TOGGLE_CHANGE})
    }

    changeBar = (value, event) => {
        //Change the value of the step based upon what user clicks
        const { step } = this.props;
        step = value;
        this.props.dispatch({type: CHANGE_STEP, payload: {value}})
    }

    onSaveToggle = event => {
        //Update the "2 Factor Authentication" into the database for the user
        axios.post('http://localhost:5000/updateToggle', {
            email: this.props.user.email, toggle: this.props.TwoStep
        })
        .then(response => {
        
        })
    }

    componentWillMount() {
        //Update the user information on "My Profile" page by fetching data from the database for the user
        axios.post('http://localhost:5001/user', {email: this.props.user.email})
        .then(response => {
            this.props.dispatch({type: UPDATE_USER, payload: {user: response.data}});
        })
    }
    
    render() { 
        const {classes} = this.props;

        return ( 
            <React.Fragment>
                <CustomAppBar />
                <div className={classes.column1}>
                    <div className={classes.hsubtab} onClick={()=>this.changeBar(1)} value="1">
                        Profile
                    </div>
                    <div className={classes.hsubtab} onClick={()=>this.changeBar(2)} value="2">
                        Privacy
                    </div>
                </div>
                <div className={classes.column2}>
                        {this.props.step === 1 ? 
                            <React.Fragment>
                            <div align="center">
                                <Typography className={classes.heading}>My Profile</Typography>
                            </div>
                            <hr/>
                            <div>
                                <Grid container xs={12}>
                                    <Grid item xs={4} align="center" className={classes.typo_head}>First Name</Grid>
                                    {
                                        this.props.onEdit ? <Grid item xs={8} align="left"><input className={classes.inputText} type="text" name="firstname" value={this.props.user.firstname} onChange={this.onChangeHandler} /></Grid> : 
                                        this.props.user.firstname ? <Typography className={classes.typo}>{this.props.user.firstname}</Typography> : ''
                                    }
                                </Grid><br/>
                                <Grid container xs={12}>
                                    <Grid item xs={4} align="center" className={classes.typo_head}>Last Name</Grid>
                                    {
                                        this.props.onEdit ? <Grid item xs={8} align="left"><input className={classes.inputText} type="text" name="lastname" value={this.props.user.lastname} onChange={this.onChangeHandler}/></Grid> : 
                                        this.props.user.lastname ? <Typography className={classes.typo}>{this.props.user.lastname}</Typography> : ''
                                    }
                                </Grid><br/>
                                <Grid container xs={12}>
                                    <Grid item xs={4} align="center" className={classes.typo_head}>Email</Grid>
                                    {
                                        this.props.onEdit ? <Grid item xs={8} align="left"><input className={classes.inputText} type="text" name="email" value={this.props.user.email} onChange={this.onChangeHandler}/></Grid> : 
                                        this.props.user.email ? <Typography className={classes.typo}>{this.props.user.email}</Typography> : ''
                                    }
                                </Grid><br/>
                                <Grid container xs={12}>
                                    <Grid item xs={4} align="center" className={classes.typo_head}>Address</Grid>
                                    {
                                        this.props.onEdit ? <Grid item xs={8} align="left"><input className={classes.inputText} type="text" name="address" value={this.props.user.address} onChange={this.onChangeHandler}/></Grid> : 
                                        this.props.user.address ? <Typography className={classes.typo}>{this.props.user.address}</Typography> : ''
                                    }
                                </Grid><br/>
                                <Grid container xs={12}>
                                    <Grid item xs={4} align="center" className={classes.typo_head}>State</Grid>
                                    {
                                        this.props.onEdit ? <Grid item xs={8} align="left"><input className={classes.inputText} type="text" name="state" value={this.props.user.state} onChange={this.onChangeHandler}/></Grid> : 
                                        this.props.user.state ? <Typography className={classes.typo}>{this.props.user.state}</Typography> : ''
                                    }
                                </Grid><br/>
                                <Grid container xs={12}>
                                    <Grid item xs={4} align="center" className={classes.typo_head}>City</Grid>
                                    {
                                        this.props.onEdit ? <Grid item xs={8} align="left"><input className={classes.inputText} type="text" name="city" value={this.props.user.city} onChange={this.onChangeHandler}/></Grid> : 
                                        this.props.user.city ? <Typography className={classes.typo}>{this.props.user.city}</Typography> : ''
                                    }
                                </Grid><br/>
                                <Grid container xs={12}>
                                    <Grid item xs={4} align="center" className={classes.typo_head}>Pincode</Grid>
                                    {
                                        this.props.onEdit ? <Grid item xs={8} align="left"><input className={classes.inputText} type="text" name="pincode" value={this.props.user.pincode} onChange={this.onChangeHandler}/></Grid> : 
                                        this.props.user.pincode ? <Typography className={classes.typo}>{this.props.user.pincode}</Typography> : ''
                                    }
                                </Grid><br/>
                                <Grid container xs={12}>
                                    <Grid item xs={4} align="center" className={classes.typo_head}>Phone</Grid>
                                    {
                                        this.props.onEdit ? <Grid item xs={8} align="left"><input className={classes.inputText} type="text" name="phone" value={this.props.user.phone} onChange={this.onChangeHandler}/></Grid> : 
                                        this.props.user.phone ? <Typography className={classes.typo}>{this.props.user.phone}</Typography> : ''
                                    }
                                </Grid><br/>
                                <Grid container xs={12}>
                                    <Grid item xs={4} align="right"></Grid>
                                    <Grid item xs={4} align="left">
                                        <button className={classes.btn} onClick={this.onSaveHandler}>Save</button>
                                        <button className={classes.btn} onClick={this.onEditHandler} >Edit</button>
                                    </Grid>
                                </Grid><br/>
                            </div>
                        </React.Fragment> : 
                    this.props.step === 2 ?
                        <React.Fragment>
                            <Paper className={classes.paper}>
                                <div align="center">
                                    <Typography variant="h6">We want to keep your account protected. Your security is our responsibility</Typography>
                                    
                                    <img src="https://www.slashgear.com/wp-content/uploads/2019/05/Security_tips_KW_image.max-1000x1000-1280x720.jpg" 
                                        className={classes.img} />
                                </div>
                            </Paper>
                            <br/>
                            <div>
                                <Paper className={classes.paperStep}>
                                    <Typography color="primary" variant="h5">Get Started</Typography>
                                    <br/>
                                    <Grid container xs={12}>
                                        <Grid item xs={4}>
                                            <Typography className={classes.typo}>Two step authentication </Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Switch
                                            color="primary"
                                            onChange={this.onToggleChange}
                                            checked={this.props.TwoStep} />
                                        </Grid>
                                    </Grid>
                                    <br/>
                                    <button onClick={this.onSaveToggle} className={classes.btn} >Save</button>
                                </Paper>
                            </div>
                        </React.Fragment>
                        : 
                        null
                    }
                </div>
            </React.Fragment>
         );
    }
}

const mapStateToProps = state => {
    return state;
}
 
export default compose(withStyles(styles), connect(mapStateToProps))(MyProfile);