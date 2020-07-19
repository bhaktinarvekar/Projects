const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const keys = require('./config/keys');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const connection = require('./database');

const app = express();

//for CORS issue
app.use('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', true);
    next(); 
    });
    
//enable pre-flight
app.options('*', cors());

/*
 *      Configure the passport object for the Google Strategy by setting the Google ClientID and ClientSecret and also specify 
 *      the callback URL over where the site should get redirected to after the Client is authenticated.
 *      It returns back the profile of the user
 */
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));


/*
 *      Configure the passport object for the Facebook strategy by setting the ClientID and Client Secret as well as the 
 *      callbackURL. If the user is authenticated, it returns back the profile of the user
 */
passport.use(new FacebookStrategy({
    clientID: keys.facebookClientID,
    clientSecret: keys.facebookClientSecret,
    callbackURL: 'http://localhost:5005/auth/facebook/callback',
    profileFields: ['id', 'email', 'displayName']
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));


/*
 *      Whenever an OAuth button is clicked for "Google", request is send on this endpoint.
 *      Specify to the passport object to use the "Google" configuration and specify the scope.
 */
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],

}));


/*
 *      This endpoint is the callback URL for "google". This endpoint receives the user profile. 
 *      Check if the user is already registered or not and if the user is already registered then send the JWT token back 
 *      to the client else make an entry into the database and send the JWT token back to the client.
 */
app.get('/auth/google/callback', passport.authenticate('google', {session: false}), (req, res) => {
    const {user} = req; 
    let name = user._json.given_name;
    let email = user._json.email;
    let lastname = user._json.family_name;

    connection.query(`select * from customer where email='${email}'`, (err, rows) => {
        if(err)
            console.log("Error in retrieving user from the database", err);
        else 
        {
            if(!rows[0].email)
            {
                connection.query(`insert into customer(email, firstname, lastname) values('${email}', '${name}', '${lastname}')`, (err, rows) => {
                    if(err)
                        console.log("Error in inserting user into database");
                })
            }

            jwt.sign({email: email, name: name}, keys.secretKey, {expiresIn: '2h'}, (err, token) => {
                if(err)
                    console.log("Error in signing token", err);
                else {
                    res.redirect('http://localhost:3000/handleLogin?token='+token);
                }
            })   
        }
    })
});


/*
 *      It requests the passport to use the Facebook strategy and and specify the scope.
 */
app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['email']
}));


/*
 *       This endpoint is the callback URL for "facebook" and it receives the data specified in the scope.
 *       Check if the user is registered or not and if he is not registered then make an entry into the database for the user
 *       and sign a JWT token and send it back to the client.
 *       If he is registered then just send the JWT token back to client.
 */
app.get('/auth/facebook/callback', passport.authenticate('facebook', {session: false}), (req, res) => {
    const {user} = req;
    let name = user._json.name;
    let email = user._json.email;

    connection.query(`select * from customer where email='${email}'`, (err, rows) => {
        if(err)
            console.log("Error in retrieving user from the database", err);
        else 
        {
            if(!rows[0].email)
            {
                connection.query(`insert into customer(email, firstname, lastname) values('${email}', '${name}', '${lastname}')`, (err, rows) => {
                    if(err)
                        console.log("Error in inserting user into database", err);
                })
            }

            jwt.sign({email: email, name: name}, keys.secretKey, {expiresIn: '2h'}, (err, token) => {
                if(err)
                    console.log("Error in signing token", err);
                else {
                    res.redirect('http://localhost:3000/handleLogin?token='+token);
                }
            });   
        }
    });
});


app.listen(5005, () => console.log("Listening on port 5005..."));