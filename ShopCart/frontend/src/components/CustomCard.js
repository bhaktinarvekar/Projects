import React from 'react';
import { Card, CardMedia, Link, CardActionArea, CardContent, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Popper from '@material-ui/core/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import {useHistory} from 'react-router-dom';
import {profiles} from '../store/images';


const useStyles = makeStyles({
    media: {
        height: 300
    },
    typo: {
        padding: 12,
        paddingLeft: 20,
        paddingBottom: 4,
        fontFamily: "Satisfy",
        fontSize: 20,
        align: "right",
        color: "black"
    },
    button: {
        color: "#003300"
        },
    typoItems: {
        fontFamily: "Georgia",
        flex: 1
        
    },
    badge: {
        fontWeight: "bold",
        fontFamily: "Georgia",
        color: "#003300"
    },
    items: {
        display: "flex"
    }
})


const CustomCard = props => {

    const {path, itemName, price, quantity} = props;
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <Card >
                <CardActionArea>
                    {price ? 
                    <PopupState variant="popper">
                        {(popupState) => (
                            <div>
                                <IconButton {...bindToggle(popupState)}>    
                                    <AddCircleOutlineIcon className={classes.button} />    
                                </IconButton>
                                <Popper {...bindPopper(popupState)} transition>
                                    <Paper>
                                        <Grid container direction="row" sm={12} spacing={1} alignContent="space-around" >
                                            <Grid item sm={4}>
                                                <IconButton className={classes.button} onClick={props.onDeleteClick}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>
                                            <Grid item sm={4}>
                                                <Typography className={classes.typo}>{props.quantity}</Typography>
                                            </Grid>
                                            <Grid item sm={4}>
                                                <IconButton className={classes.button} onClick={props.onAddClick}>
                                                    <AddIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Popper>
                            </div>
                        )}
                        </PopupState>: null}
                            <CardMedia className={classes.media}
                                image={profiles[path]} />
                                <CardContent>
                                    <Link onClick={props.onClick} className={classes.typo}>{props.category}</Link>
                                    <Typography onClick={props.onClickHandler} className={classes.typoItems} variant="h5">{itemName}</Typography>
                                    <div className={classes.items}>
                                    { price ? <Typography className={classes.typoItems} variant="subtitle2">${price}</Typography> : null}
                                    {quantity>0? <Typography className={classes.badge}>In cart: {quantity}</Typography>: 
                                     null}
                                    </div>       
                                </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );

}

export default CustomCard;