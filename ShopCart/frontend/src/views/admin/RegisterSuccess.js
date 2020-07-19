import React from 'react';
import {Paper, Typography, Container, Link} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: "20px",
        padding: "10px",
        height: "300px",
        width: "600px",
    },
    heading: {
        marginTop: "20px"
    }
  }));


const RegisterSuccess = props => {
    const classes = useStyles();
    return (
    <Container Component="main" maxWidth="sm">
                <Paper className={classes.paper} elevation={3}>
                    <br />
                    <div>
                        <br/>
                        <Typography variant="h5" align="center" color="primary">
                            Registered Successfully
                        </Typography>
                        <hr />
                        <br/>
                        <Typography variant="subtitle" align="center" style={{marginLeft:"70px"}}>
                            Thank you for creating an account.
                            Please click <Link href="/admin/login" color="primary"> here </Link>to Login
                        </Typography>
                    </div>
                </Paper>
            </Container>
)};

export default RegisterSuccess;