import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Grid, Paper } from '@material-ui/core';
import StoreIcon from '@material-ui/icons/Store';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import {connect} from 'react-redux';
import CustomDrawer from './CustomDrawer';
import {TOGGLE_DRAWER} from '../reducers/actions';
import CustomSearch from './CustomSearch';
import { withRouter } from 'react-router';
import {compose} from 'redux';
import axios from 'axios';


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
    
    },
    search: {
        marginTop: 5,
    },
    logo: {

    },
    cart: {
        marginTop: 10
    },
    txt: {
        width: "500px"
    },
    paper: {
        width: "160px",
        cursor: "pointer"
    }
}));
    

const CustomAppBar = ({totalItems, cartItems, dispatch, drawer, toggleDrawer, history}) => 
{
    const classes = useStyles();

    //On Logout, remove the "token" and "state" from the localStorage i.e. Browser
    const onSubmitLogout = event => {
        localStorage.removeItem('token');
        localStorage.removeItem('state');
        history.push('/login');
    }

    /**
     *      Verify if the JWT token is present and it is valid. If yes then redirect to MyOrders component else redirect to Login 
     *      page
     */
    const onSubmitOrders = event => {
        
        axios.get('http://localhost:5006/verifyToken', {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                if(response.data === "OK") {
                    history.push('/myorders');
                }
                else {
                    history.push('/login');
                }
            }) 
    }

    const onViewProfile = event => {
        
        //verify if the token is expired on tampered on the server side
        axios.get('http://localhost:5006/verifyToken', {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                if(response.data === "OK") {
                    history.push('/myprofile');
                }
                else {
                    history.push('/login');
                }
            }) 
    }

    return (
        <AppBar>
            <Toolbar className={classes.appBar}>
                <Grid container spacing={0}>
                    <Grid item xs={2}>
                        <IconButton  href="/dashboard" color="inherit" >
                            <StoreIcon fontSize="large" />
                                <Typography className={classes.typo} variant="h5">
                                    ShopCart
                                </Typography>
                         </IconButton>
                    </Grid>
                    <Grid item xs={7} className={classes.search} align="left">
                        <CustomSearch />
                    </Grid>
                    <Grid item xs={2} align="right">
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
                                            <ListItem onClick={onViewProfile}>
                                                <ListItemText>My Profile</ListItemText>
                                            </ListItem>
                                            <ListItem onClick={onSubmitOrders}>
                                                <ListItemText>My Orders</ListItemText>
                                            </ListItem>
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
                    <Grid item xs={1} align="center" className={classes.cart}>
                        <Badge badgeContent={totalItems} showZero color="primary" onClick={toggleDrawer}>
                            <ShoppingCartIcon fontSize="large" />
                        </Badge>
                        <CustomDrawer open={drawer} onClose={toggleDrawer} cartItems={cartItems} />
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

const mapStateToProps = state => {
    return {...state};
}

const mapDispatchToProps = dispatch => {
    return {
        toggleDrawer: () => dispatch({type: TOGGLE_DRAWER})
    }
}

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(CustomAppBar);