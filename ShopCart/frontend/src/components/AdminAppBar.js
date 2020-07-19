import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Paper } from '@material-ui/core';
import StoreIcon from '@material-ui/icons/Store';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import {  Grid } from '@material-ui/core';
import Popper from '@material-ui/core/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {connect} from 'react-redux';
import {TOGGLE_DRAWER} from '../reducers/actions';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';

//Add styling to the module using high order function
const useStyles = makeStyles((themes) => ({
    appBar: {
        backgroundColor: "#009973",
    },
    typo: {
        fontFamily: "Sacramento",
    },
    profile: {
        color: "white",
        fontFamily: "Sacramento",
        fontSize: "30",
        flex: "0 0 auto"
    },
    search: {
        flex: "0 0 auto",
        marginLeft: "100px"
    },
    logo: {
        flex: "0 0 auto"
    },
    cart: {
        flex: "0 0 auto"
    },
    txt: {
        width: "500px"
    },
    btn: {
        color: "white",
        textTransform: "capitalize",
        fontSize: 20,
        fontFamily: "Sacramento",
        marginTop: 5
    },
    paper: {
        width: "160px",
        cursor: "pointer"
    }
}))


const AdminAppBar = props => 
{
    const classes = useStyles();

    //On Logout, remove the "state" and "token" from the localStorage i.e. Browser
    const onSubmitLogout = event => {
        localStorage.removeItem('token');
        localStorage.removeItem('state');
        props.history.push('/admin/login');
    }

    return (
            <AppBar>
                <Toolbar className={classes.appBar}>
                    <Grid container xs={12}>
                        <Grid item xs={2}>
                            <IconButton  href="/admin/dashboard" color="inherit" >
                                <StoreIcon fontSize="large" />
                                <Typography className={classes.typo} variant="h5">
                                    ShopCart
                                </Typography>
                            </IconButton>
                        </Grid>
                        <Grid item xs={6} align="right">
                            <PopupState variant="popper" popupId="demo-popup-popper">
                            {(popupState) => (
                                <div>
                                    <IconButton className={classes.profile} {...bindToggle(popupState)}>
                                        <AccountCircleIcon fontSize="large" className={classes.button} />
                                        <Typography className={classes.typo} variant="h6">My Account</Typography>
                                    </IconButton>
                                    <Popper {...bindPopper(popupState)} transition>
                                        <Paper elevation={3} className={classes.paper}>
                                            <List style={{marginTop:"0"}} component="nav">
                                                <ListItem onClick={onSubmitLogout}>
                                                    <ListItemText>Logout</ListItemText>
                                                </ListItem>
                                            </List>
                                        </Paper>
                                    </Popper>
                                </div>
                            )}
                            </PopupState>
                        </Grid>
                        <Grid item xs={2} align="center">
                            <Button className={classes.btn} href="/admin/addNewCategory">New Category</Button>
                        </Grid>
                        <Grid item xs={2} align="left">
                            <Button className={classes.btn} href="/admin/addProduct">New Product</Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
    );
}

const mapStateToProps = state => {
    const {totalItems, cartItems, drawer} = state;
    return {totalItems, cartItems, drawer};
}

const mapDispatchToProps = dispatch => {
    return {
        toggleDrawer: () => dispatch({type: TOGGLE_DRAWER})
    }
}

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps ))(AdminAppBar);