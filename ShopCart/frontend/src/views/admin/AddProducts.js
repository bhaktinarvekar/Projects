import React, { Component } from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { withStyles } from '@material-ui/core';
import {Grid, Paper, Typography} from '@material-ui/core';
import axios from 'axios';
import AdminAppBar from '../../components/AdminAppBar';
import { Alert } from '@material-ui/lab';
import {UPDATE_PRODUCTS, ERROR_MESSAGES, EMPTY_ERRORS, CLEAR_PRODUCTS} from '../../reducers/actions';
import AuthService from '../../utils/AuthService';

const styles = themes => ({
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
        marginLeft: 180,
        marginBottom: 20,
        fontWeight: "bold"
    }
})

class AddProducts extends Component 
{
    auth = new AuthService();

    componentWillMount() 
    {   
        const auth = new AuthService();

        //Check if the user is authenticated. If not, redirect him to the Login page
        if(auth.isAuthenticated()){
            this.props.dispatch({type: EMPTY_ERRORS});
        }
        else{
            this.props.history.push('/login');
        }
    }

    fileChangeHandler = event => {
        this.props.dispatch({type: UPDATE_PRODUCTS, payload: {name: event.target.name, value: event.target.files[0]}});
    }

    onChangeHandler = event => {
        const {name, value} = event.target;
        this.props.dispatch({type: UPDATE_PRODUCTS, payload: {name, value}});
    }

    handleSubmit = event => {
        const file = document.querySelector('#img');
        file.value='';
        const data = new FormData();
        
        data.append('fileUploaded', this.props.product.fileUploaded);
        data.append('category', this.props.product.category);
        data.append('price', this.props.product.price);
        data.append('productName', this.props.product.productName);

        //Add new product into the database and update the error message and clear the user input
        axios.post('http://localhost:5003/addNewProduct', data)
        .then(response => {
            this.props.dispatch({type: CLEAR_PRODUCTS});
            this.props.dispatch({type: ERROR_MESSAGES, payload: {message: "Product added successfully"}});
        });

    }

    render() { 
        const {categories, classes} = this.props;
        
        return ( 
            <React.Fragment>
                <div>
                    <AdminAppBar />
                    <Paper className={classes.paper}>
                        {this.props.ErrorMessages.length > 0 ? <Alert serverity="success">{this.props.ErrorMessages}</Alert> : null}
                        <Typography className={classes.heading} variant="h6">New Product</Typography>
                        <hr/>
                        <br/>
                        <Grid container sm={12}>
                            <Grid item sm={4}>
                                <Typography className={classes.typo} align="right">Select a category</Typography>
                            </Grid>
                            <Grid item sm={8}>
                                <select className={classes.inputText} name="category" value={this.props.product.category} onChange={this.onChangeHandler}>
                                    <option value=""></option>
                                    {
                                        categories.map((item, index) => (
                                            <option value={item.name} >{item.name}</option>
                                            ))
                                    }
                                </select>
                            </Grid>
                        </Grid>
                        <br/>
                        <Grid container sm={12}>
                            <Grid item sm={4}>
                                <Typography className={classes.typo} align="right">Enter Product Name</Typography>
                            </Grid>
                            <Grid item sm={8}>
                                <input className={classes.inputText} type="text" name="productName" value={this.props.product.productName} onChange={this.onChangeHandler} />
                            </Grid>
                        </Grid>
                        <br/>
                        <Grid container sm={12}>
                            <Grid item sm={4}>
                                <Typography className={classes.typo} align="right">Enter Price</Typography>
                            </Grid>
                            <Grid item sm={8}>
                                <input className={classes.inputText} type="text" name="price" value={this.props.product.price} onChange={this.onChangeHandler} />
                            </Grid>
                        </Grid>
                        <br/>
                        <Grid container sm={12}>
                            <Grid item sm={4}>
                                <Typography className={classes.typo} align="right">Upload Image</Typography>
                            </Grid>
                            <Grid item sm={8}>
                                <input className={classes.file} type="file" name="fileUploaded" id="img" onChange={this.fileChangeHandler}/>
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
            </React.Fragment>
         );
    }
}

const mapStateToProps = state => {
    return {...state};
}
 
export default compose(connect(mapStateToProps), withStyles(styles))(AddProducts);