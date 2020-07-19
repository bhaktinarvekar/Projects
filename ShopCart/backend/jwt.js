const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const keys = require('./config/keys');

const app = express();
app.use(cors());


/*
 *      Check whether the token is tempered or is expired and if the token is correct then send the response as "OK" back to
 *      client otherwise send an error.
 */
app.get('/verifyToken', (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    
    jwt.verify(token, keys.secretKey, (err, authData) => {
        if(err)
            res.send("Error in verifying JWT");
        else {
            return res.send("OK");
        }
    })
})


app.listen(5006, () => console.log("Listening on port 5006..."));

