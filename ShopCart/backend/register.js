const connection = require('./database.js');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const speakeasy = require('speakeasy');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');


const app = express();
app.use(express.json());
app.use(cors());

connection.connect((err) => {
    if(err)
        console.log("Error in establishing the connection to the Database in register.js...");
    else
        console.log("Connection established successfully in register.js...");
});

app.post('/register', (req, res) => {
    const {email,firstname,middlename,lastname,address,city,state,pincode,phone,password,question1,answer1,question2,answer2,role} = req.body;
    connection.query(`SELECT * FROM CUSTOMER WHERE email="${req.body.email}"`, (err, rows) => {
        if(err)
            console.log("Error in retrieving data...");
        else
        {
            if(rows[0] !== undefined)
                return res.send("Username already exists");
            else
            {
                //Hash the password before inserting it into the database
                bcrypt.hash(password, 10, (err, hash) => {
                    connection.query(`INSERT INTO CUSTOMER (email,firstname,middlename,lastname,address,city,state,pincode,phone,pass,question1,answer1,question2,answer2,role) VALUES ("${email}","${firstname}","","${lastname}","${address}","${city}","${state}","${pincode}","${phone}","${hash}","${question1}","${answer1}","${question2}","${answer2}","${role}")`, (err, rows) => {
                        if(err)
                            console.log("Error in inserting data...", err);
                        else
                            res.send("Registered successfully");
                        });
                })  
            }
        }
    });
});

app.post('/updateUser', (req, res) => {
    const {user} = req.body;
    user.pincode = user.pincode === '' ? 00000 : user.pincode;
    connection.query(`UPDATE customer set firstname='${user.firstname}', lastname='${user.lastname}', address='${user.address}', state='${user.state}', city='${user.city}', pincode=${user.pincode}, phone='${user.phone}' where email='${user.email}'`, (err, rows) => {
        if(err)
            console.log("Error in updating row in table", err);
        else {
            res.send("OK");
        }
    })
});


/**
 *      Update the toggle status into the database and check the status of the toggle.
 *      If the user enables the two factor authentication, then generate a secret key for the user and check if there is already 
 *      an entry into the database. If yes then delete that entry and make a new entry with the new secret key.
 *      If the user disables the two factor authentication, then remove the entry from the database.
 * 
 *      A secret key is required to generate the passcode for the two step authentication
 */
app.post('/updateToggle', (req, res) => {
    const {toggle, email} = req.body
    connection.query(`update customer set two_factor=${toggle} where email='${email}'`, (err, rows) => {
        if(err)
            console.log("Error in updating data", err);
        else
        {
            if(toggle || toggle === true)
            {
                var secret = speakeasy.generateSecret({length: 20}).base32;
                connection.query(`select * from secretStore where email='${email}'`, (err, rows) => {
                    if(err)
                        console.log("Error in retrieving data from the database", err);
                    else
                    {
                        if(rows[0].email === email)
                        {
                            connection.query(`delete from selectStore where email='${email}'`, (err, rows) => {
                                if(err)
                                    console.log("Error in deleting data from the database", err);
                            });
                        }
                    }
                })
                connection.query(`insert into secretStore(email, secret) values('${email}', '${secret}')`, (err, rows) => {
                    if(err)
                        console.log("Error in inserting data into the database", err);
                    else
                    {
                        res.send("OK");
                    }
                });
            }
            else
            {
                connection.query(`delete from secretStore where email='${email}'`, (err, rows) => {
                    if(err)
                        console.log("Error in deleting data from the database", err);
                    else
                    {
                        res.send("OK");
                    }
                })
            }
        }
    })
})

/**
 *      Fetch the secret key for the requested user from the database and create an OTP with the use of the "speakeasy" module.
 *      Create a transporter with nodemailer and send an email with the generated OTP to the requested email address
 */
app.post("/getOTP", (req, res) => {
    const {email} = req.body;
    connection.query(`select * from secretStore where email='${email}'`, (err, rows) => {
        if(err)
            console.log("Error in retrieving data from the database", err);
        else
        {
            console.log(rows, email)
            var secret = rows[0].secret;
            const otp = speakeasy.totp({secret, encoding: "base32"})

            const transport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'shopcart.shopeasily@gmail.com',
                    pass: 'ShopCart@123'
                }
            });

            transport.sendMail({
                from: 'shopcart.shopeasily@gmail.com',
                to: email,
                subject: "Verification Code",
                html: `<p>The verification code is ${otp}</p>`
            });

            res.send(`Email with the OTP is send to ${email}`);
        }
    })
});


/**
 *      Fetch the secret key from the database for the requested user. Verfiy the token 
 *      received with the speakeasy module and the boolean result is send back to the client.
 */
app.post("/verifyOTP", (req, res) => {
    
    const {email, token} = req.body;
    connection.query(`select * from secretStore where email='${email}'`, (err, rows) => {
        if(err)
            console.log("Error in retrieving data from the database", err);
        else
        {
            var secret = rows[0].secret;
            var valid = speakeasy.totp.verify({secret, encoding: "base32", token, window: 0});
            res.send({valid});
        }
    })
})

app.listen(5000, () => console.log("Listening on port 5000..."));
