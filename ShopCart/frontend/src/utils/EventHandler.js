import React, { Component } from 'react';
import { EventEmitter } from 'events';
import { withRouter } from 'react-router';
import axios from 'axios';

class EventHandler extends EventEmitter 
{
    //Verify whether the token is tampered or expired
    onViewprofile() {
        axios.post('http://localhost:5006/verifyToken')
            .then(response => {
                
            }) 
    }
}

export default withRouter(EventHandler);