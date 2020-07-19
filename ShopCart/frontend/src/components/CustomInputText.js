import React from 'react';
import {FormControl, TextField} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    textField: {
        align: "center",
        marginLeft: "80px"
    }
}))

const CustomInputText = props => 
{
    const classes = useStyles();

    return (
        <FormControl>
            <TextField
                {...props}
                variant="outlined"
                fullWidth={props.fullWidth}
                className={classes.textField}
                onChange={props.onChange}
                />
        </FormControl>
    );

}

export default CustomInputText;