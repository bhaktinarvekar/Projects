import React, { Component } from 'react';
import {Grid, Paper, Typography} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import AdminAppBar from '../../components/AdminAppBar';
import { withStyles } from '@material-ui/core';
import {connect} from 'react-redux';
import {compose} from 'redux';
import axios from 'axios';
import {ERROR_MESSAGES, UPDATE_CATEGORY, EMPTY_ERRORS, CLEAR_CATEGORY} from '../../reducers/actions';
import AuthService from '../../utils/AuthService';

const styles = theme => ({
    paper: {
        marginTop: 100,
        height: 500,
        width: 600,
        marginLeft: 450,
        padding: 50
    },
    inputText: {
        width: 250,
        borderRadius: 5,
        border: "1px solid #ccc",
        marginLeft: 20,
        fontFamily: "Sacramento",
        height: 30
    },
    file: {
        marginLeft: 20
    },
    typo: {
        color: "grey"
    },
    btn: {
        marginLeft: 20,
        width: 200,
        backgroundColor: "#009973",
        color: "white",
        border: "1px solid #009973",
        borderRadius: 5,
        fontFamily: "Sacramento",
    },
    heading: {
        fontSize: 24,
        color: "#009973",
        marginLeft: 150,
        marginBottom: 20,
        fontWeight: "bold"
    }
})

class AddNewCategory extends Component 
{
    componentWillMount() 
    {
        const auth = new AuthService();

        /**
         *      Check if the user is authenticated and is yes empty all the error. 
         *      If the user is not authenticated, redirect him to the login page
         */
        if(auth.isAuthenticated()){
            this.props.dispatch({type: EMPTY_ERRORS});
        }
        else{
            this.props.history.push('/login');
        }
    }

    onChangeHandler = event => {
        this.props.dispatch({type: UPDATE_CATEGORY, payload: {value: event.target.value, name: event.target.name}});
    }

    fileChangeHandler = event => {
        this.props.dispatch({type: UPDATE_CATEGORY, payload: {value: event.target.files[0], name: event.target.name}});
    }

    handleSubmit = event => {
        //to remove the selected file on submit
        const file = document.querySelector('#img');
        file.value = '';

        const data = new FormData();
        data.append('fileUploaded', this.props.category.fileUploaded);
        data.append('name', this.props.category.category);
        
        //Add the new category into the database and update the error messages and clear the user input
        axios.post('http://localhost:5003/addNewCategory', data)
        .then(response => {
                this.props.dispatch({type: CLEAR_CATEGORY});
                this.props.dispatch({type: ERROR_MESSAGES, payload: {message: "File uploaded successfully"}});
            })
    }

    render() 
    { 
        const {classes} = this.props;
        return ( 
            <div>
                <AdminAppBar />
                <Paper className={classes.paper}>
                    {this.props.ErrorMessages.length > 0 ? <Alert severity="success">{this.props.ErrorMessages[0]}</Alert> : null}
                    <Typography className={classes.heading} variant="h6">Add new category</Typography>
                    <hr/>
                    <br/>
                    <Grid container sm={12}>
                        <Grid item sm={4}>
                            <Typography align="right" className={classes.typo}>Add a new category</Typography>
                        </Grid>
                        <Grid item sm={8}>
                            <input className={classes.inputText} type="text" name="category" onChange={this.onChangeHandler} value={this.props.category.category} />
                        </Grid>
                    </Grid>
                    <br/>
                    <Grid container sm={12}>
                        <Grid item sm={4}>
                            <Typography align="right" className={classes.typo}>Upload Image</Typography>
                        </Grid>
                        <Grid item sm={8}>
                            <input className={classes.file} type="file" name="fileUploaded" id="img" onChange={this.fileChangeHandler} />
                        </Grid>
                    </Grid>
                    <br/>
                    <Grid container sm={12}>
                        <Grid item sm={4}>
                            <label></label>
                        </Grid>
                        <Grid item sm={8}>
                            <button className={classes.btn} onClick={this.handleSubmit}>Submit</button>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
         );
    }
}

const mapStateToProps = state => {
    return {...state};
}
 
export default compose(connect(mapStateToProps), withStyles(styles))(AddNewCategory);