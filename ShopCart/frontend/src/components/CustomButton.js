import React from 'react';
import { FormControl, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    submit: {
        width: "300px",
        backgroundColor: "#009973",
        color: "white"
      }
}));

const CustomButton = props => 
{
    const classes = useStyles();
    return(
        <FormControl>
            <Button
            type="submit"
            style={props.style}
            variant="contained"
            className={classes.submit}
            onClick={props.onSubmit}
          >
              {props.name}
          </Button>
        </FormControl>
    );
}

export default CustomButton;