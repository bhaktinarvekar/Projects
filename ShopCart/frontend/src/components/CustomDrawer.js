import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import {List, ListItem, ListItemText, Box, Typography, Grid} from '@material-ui/core';
import {TableContainer, Table, TableBody, TableCell, Paper, TableRow, IconButton} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {profiles} from '../store/images';
import DeleteIcon from '@material-ui/icons/Delete';
import {connect} from 'react-redux';
import {REMOVE_ITEM, TOTAL_AMOUNT, ADD_ITEM, DELETE_ITEM} from '../reducers/actions';
import CustomButton from './CustomButton';
import {useEffect} from 'react';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {compose} from 'redux';
import { withRouter } from "react-router";

const useStyles = makeStyles({
    button: {
        color: "#003300"
    },
    drawer: {
        width: "600px"
    },
    table: {
        width: "600px"
    },
    typo: {
        color: "green",
        fontSize: "24px",
        flex: 20,
        fontWeight: "bold"
    },
    grid: {
        display: "flex",
        padding: "10px",
        margin: 10
    },
    final: {
        color: "green",
        fontSize: "18px",
        fontWeight: "bold",
        padding: 20,
    },
    emptyCart: {
        fontSize: "20px",
        color: "green",
        fontWeight: "bold"
    },
    totalCost: {
        marginBottom: -30
    }
})

const CustomDrawer = props => {

    useEffect(() => {
        //calculated the totalAmount everytime the component is rendered
        props.calAmount();
    });

    const checkoutHandler = event => {
        props.history.push("/checkout");
        props.onClose();
    }

    const {onClose, totalAmount, addItem, deleteItem} = props;
    const classes = useStyles();


    let tax = ((18 * totalAmount)/100).toFixed(2);
    let shipping = ((15 * totalAmount)/100).toFixed(2);
    let totalCost = (parseFloat(tax) + parseFloat(shipping) + parseFloat(totalAmount)).toFixed(2);

    return (
        <Box className={classes.drawer}>
            <Drawer  anchor="right" open={props.open} onClose={onClose}>
                <div className={classes.grid} container xs>
                    <Typography className={classes.typo}>Items</Typography>
                    <CustomButton onSubmit={onClose} name="Close" />
                </div>
                { !props.cartItems ? 
                <React.Fragment>
                    <List className={classes.drawer}>
                        <ListItem>
                            <ListItemText className={classes.emptyCart}>There are no items in the cart</ListItemText>
                        </ListItem>
                    </List>
                </React.Fragment>
                : null}
                
                        <TableContainer className={classes.table} component={Paper}>
                            <Table>
                                <TableBody>
                                {props.cartItems ? props.cartItems.length>0 ? props.cartItems.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell><img src={profiles[item.path]} height="70px" width="70px" /></TableCell>
                                        <TableCell>{item.itemName}</TableCell>
                                        <TableCell>${item.price}</TableCell>
                                        <TableCell>
                                            <Grid container>
                                                <Grid item xs={4}>
                                                    <AddIcon onClick={() => addItem(item)} />
                                                </Grid>
                                                <Grid item xs={4} align="center">
                                                    <Typography>{item.quantity}</Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <RemoveIcon onClick={(event) => deleteItem(item.id)} />
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell>
                                                <IconButton className={classes.button} onClick={() => props.remove(item.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                        </TableCell>
                                    </TableRow>)) : null : null}
                                </TableBody>
                            </Table>
                        </TableContainer>
                
                {props.cartItems ? props.cartItems.length > 0 ? 
                <React.Fragment>
                    <Paper >
                        <Grid container xs={12} className={classes.totalCost}>
                            <Grid item xs={6} className={classes.final}>Subtotal</Grid>
                            <Grid item xs={6} className={classes.final}>${totalAmount}</Grid>
                        </Grid>
                        <Grid container xs={12} className={classes.totalCost}>
                            <Grid item xs={6} className={classes.final}>Tax</Grid>
                            <Grid item xs={6} className={classes.final}>${tax}</Grid>
                        </Grid>
                        <Grid container xs={12} className={classes.totalCost}>
                            <Grid item xs={6} className={classes.final}>Shipping</Grid>
                            <Grid item xs={6} className={classes.final}>${shipping}</Grid>
                        </Grid>
                        <hr/>
                        <Grid container xs={12}>
                            <Grid item xs={6} className={classes.final}>Total Cost</Grid>
                            <Grid item xs={6} className={classes.final}>${totalCost}</Grid>
                        </Grid>
                        
                    </Paper>
                    <div align="right">
                        <CustomButton name="CHECKOUT" onSubmit={checkoutHandler} />
                    </div>
                </React.Fragment> 
                : null : null}
            </Drawer>
            </Box>
    );
}

const mapStateToProps = state => {
    return {...state};
}

const mapDispatchToProps = dispatch => {
    return {
        remove: (id) => dispatch({type: REMOVE_ITEM, payload: {id}}),
        calAmount: () => dispatch({type: TOTAL_AMOUNT}),
        addItem: (item) => dispatch({type: ADD_ITEM, payload: {item}}),
        deleteItem: (id) => dispatch({type: DELETE_ITEM, payload: {id}})
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(CustomDrawer);