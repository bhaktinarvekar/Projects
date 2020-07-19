const express = require('express');
const connection = require('./database.js')
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('./config/keys');

const app = express();
app.use(express.json());
app.use(cors());

connection.connect((err) => {
    if(err)
        console.log("Error in establishing the connection to the Database in login.js...");
    else
        console.log("Connection established successfully in login.js...");
});


app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    connection.query(`SELECT * from CUSTOMER where email="${email}"`, (err, rows) => {
        if(err)
            return res.send("Unable to fetch the query", err);
        else
        {
            if(!rows[0]){
                return res.send("Error");
            }
            else
            {
                // check if the password stored in the database matches with the user entered password
                bcrypt.compare(password, rows[0].pass, (err, val) => {
                    if(err)
                        return console.log("Issue in comparing the passwords", err);
                    
                    /**
                     *      If the password entered is correct, sign a jwt token by using the secret key and the expiry time 
                     *      for the token and send the token back as the response stating that the user has logged in successfully.
                     *      Also, send the "Two Factor Authentication" details and the role of the user along with the JWT 
                     *      as a response.
                     */
                    if(val){
                        jwt.sign({email: email, name: rows[0].firstname}, keys.secretKey, {expiresIn: "2h"}, (err, token) => {
                            if(err)
                                console.log("Error in signing the token", err);
                            else {
                                console.log("Sending the JWT token back as a response...");
                                return res.send({token, twoFactor: rows[0].two_factor, role: rows[0].role});
                            }
                        })
                    }
                    else 
                        return res.send("Error");
                })
            }
        }
    })
});


app.post("/forgotpwd", (req, res) => {
    const { email, question_1, answer_1, question_2, answer_2 } = req.body;
    
    connection.query(`SELECT * from CUSTOMER where email="${email}"`, (err, rows) => {
        if(err)
            console.log("Error in retrieving the data", err);
        if(rows[0] === undefined)
            return res.send("Invalid email address");
        else{
            const email1 = rows[0].email;
            const { question1, answer1, question2, answer2 } = rows[0];

            if((question_1 === parseInt(question1) && answer_1 === answer1) && (question_2 === parseInt(question2) && answer_2 === answer2))
            {
                return res.send("Valid question and answer");
            }
            else
            {
                return res.send("Please select the correct question or answer");
            }  
        }
    })
});


app.post("/resetpwd", (req, res) => {
    const { email, pass } = req.body;
    connection.query(`UPDATE CUSTOMER SET pass="${pass}" where email="${email}"`, (err, rows) => {
        if(err) {
            return res.send("Error in fetching the data", err);
        }
        return res.send("Password reset successfully");
    })
});

app.post('/user', (req, res) => {
    const {email} = req.body;

    connection.query(`select * from customer where email="${email}"`, (err, rows) => {
        if(err)
            console.log("Error in retrieving data from the database", err);
        else {
            res.send(rows[0]);
        }
    });
});


app.listen(5001, () => console.log("Listening on port 5001..."));