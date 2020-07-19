const express = require("express");
const cors = require("cors");
const connection = require("./database");
const { json } = require("body-parser");
const {months, days} = require("./store/store");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const keys = require('./config/keys');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('views'));



connection.connect((err) => {
    if(err)
        console.log("Error in establishing the connection to the Database in checkout.js...");
    else
        console.log("Connection established successfully in checkout.js...");
});

/**
 *      Verify whether the token is valid and is not tempered. If it is valid then calculate the dates for the next five days.
 */
app.get('/getNextFive', (req, res) => {
    let token = (req.headers.authorization).split(' ')[1];

    jwt.verify(token, keys.secretKey, (err, data) => {
        if(err)
            return res.send("Invalid token", err);
        else {
            var date = new Date();
            let day = [];
            let dates = [];

            for(var i=1; i<=5; i++)
            {
                day.push(days[new Date(date.getTime() + i*24*60*60*1000).getDay()]);
                dates.push(new Date(date.getTime() + i*24*60*60*1000).getDate());
            }

            var month = months[date.getMonth()];
            var year = date.getFullYear();

            res.send({month, year, dates, day});
                }
            })
});

/*
 *      Check whether the token is tempered or not and if it is a valid token then make an entry of the order into the database 
 *      and return the order id back to the client. If the token is invalid/tempered then return a response stating "Invalid token"
 */
app.post('/paymentSubmited', (req, res) => {
    let token;
    if(req.headers.authorization)
        token = (req.headers.authorization).split(" ")[1];

    jwt.verify(token, keys.secretKey, (err, data) => {
        if(err)
            res.send("Invalid token");
        else {
            const {time, date} = req.body;
            let timeSlot = parseInt(time) + 1;
            
            connection.query(`insert into orders_assigned(date, slot, status, assign) values("${date}", "${timeSlot}", "pending", "");`, (err, rows) => {
                if(err)
                    console.log("Error in inserting data into the database", err);
                else
                {
                    connection.query(`select order_id from orders_assigned where order_id in (select max(order_id) from orders_assigned)`, (err, rows) => {
                        if(err)
                            console.log("Error in fetching data into the database", err);
                        else{
                            res.send(String(rows[0].order_id));
                        }
                    }) 
                }
            });
        }
    });
});


/*
 *      Fetch the information of the order from the database. If the order exist, then send the details of the rider back as 
 *      response if the rider is assigned to the order otherwise return response stating "Not Assigned"
 */
app.post('/getStatus', (req, res) => {

    const {id} = req.body;
    connection.query(`select * from orders_assigned where order_id = ${id};`, (err, rows) => {
        if(err)
            console.log("Error in fetching the data from the database", err);
        else{
            let id = rows[0].assign;
            if(id !== '')
            {
                connection.query(`select * from riders where id=${id}`, (err, rows_rider) => {
                    if(err)
                        console.log("Error in retrieving data from the database", err);
                    else
                    {
                        let name = rows_rider[0].name;
                        rows[0].assignName = name;
                        res.send(rows[0]);
                    }
                });
            }
            else{
                rows[0].assign = "Not Assigned";
                rows[0].assignName = "Not Assigned";
                res.send(rows[0]);
            }
        }
    });
});


/*
 *       Fetches all the orders that are in the pending state and send them back to the admin for approval
 */
app.get('/orders', (req, res) => {
    connection.query(`select * from orders_assigned where status="pending"`, (err, rows) => {
        if(err)
            console.log("Error in fetching the data from the database", err);
        else
        {
            let rowsTemp = rows.map((row, index) => {
                row.date = String(row.date).substring(0, 10);
                return row;
            })
            res.send(rowsTemp);
        }
    })
});


/*
 *       Fetch the order details like delivery slot and date from the database.
 *       Check if there is any available Rider for the given day and time from the database.
 *       If there are no Riders available, send the response back to client stating "No Riders available"
 *       If there are Riders available, then select the first available rider and assign the given order to him/her
 *       and change the status of the order to APPROVED
 */
app.post('/approveOrder', (req, res) => {
    const {id} = req.body;
    connection.query(`select * from orders_assigned where order_id=${id}`, (err, rows) => {
        if(err)
            console.log("Error in fetching data from the database 1", err);
        else{
            let year = new Date(rows[0].date).getFullYear();
            let month = new Date(rows[0].date).getMonth()+1;
            let day = new Date(rows[0].date).getDate();
            let slot = rows[0].slot;
            let date = year+"-"+month+"-"+day;
            
            connection.query(`select * from check_availability where date="${date}" and slot=${slot} and available=true`, (err, rows) => {
                if(err)
                    console.log("Error in fetching data from the database 2", err);
                else
                {
                    if(rows.length > 0)
                    {
                        let selectedId = rows[0].id;
                        let name = rows[0].name;
                        connection.query(`update check_availability set available=false where id=${selectedId}`, (err, rows) => {
                            if(err)
                                console.log("Error in updating data in the table", err);
                            else
                            {
                                connection.query(`update orders_assigned set status="approved", assign=(select id from riders where name="${name}") where order_id=${id}`, (err, rows) => {
                                    if(err)
                                        console.log("Error in updating data into the database", err);
                                    else{
                                        connection.query(`select * from orders_assigned where order_id=${id}`, (err, rows) => {
                                            if(err)
                                                console.log("Error in fetching the data from the database", err);
                                            else{
                                                return res.send(rows[0]);
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                    else
                        return res.send("No riders available");
                }
            })
        }
    })
});


/*
 *       Fetch all the items for the given order id. Calculate the totalCost for the given order.
 *       Also, calculate the tax, shipping cost and calculate the final cost. Create a new handlebar template to for styling an 
 *       email confirmation and pass it to the transporter. Send an email to the requested emailID
 */
app.post('/orderConfirmation', (req, res) => {
    const {user, orderID} = req.body;
    let date, final, shipping_cost, tax;
    setTimeout(()=> {
        connection.query(`select * from order_history where order_id=${orderID}`, (err, rows) => {
            if(err)
                console.log("Error in retrieving data from the database", err);
            else {
                let email = rows[0].email;
                let total_price = 0;
                for(var i=0; i<rows.length; i++)
                {
                    total_price += parseFloat(rows[i].quantity) * parseFloat(rows[i].price);
                }
                total_price = (parseFloat(total_price)).toFixed(2);
                date = rows[0].date;
                shipping_cost = ((15 * parseFloat(total_price))/100).toFixed(2);
                tax = ((18 * parseFloat(total_price))/100).toFixed(2);
                final = (parseFloat(total_price) + parseFloat(shipping_cost) + parseFloat(tax)).toFixed(2);
    
                let transport = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'shopcart.shopeasily@gmail.com',
                        pass: 'ShopCart@123'
                    }
                });
            
                var options = {
                    viewEngine: {
                        extname: 'handlebars',
                        layoutsDir: 'views/', // location of handlebars templates
                        defaultLayout: 'email', // name of main template
                        partialsDir: 'views/', // location of your subtemplates aka. header, footer etc
                    },
                    viewPath: 'views',
                    extName: '.handlebars'
                }
                transport.use('compile', hbs(options));
            
                const mailOptions = {
                    from: 'shopcart.shopeasily@gmail.com',
                    to: email,
                    subject: 'Order Confirmation',
                    template: 'email',
                    context: {
                        name: user.firstname,
                        orderID: orderID,
                        date: date,
                        price: total_price,
                        tax: tax,
                        ship_price: shipping_cost,
                        total: final,
                        shipping_add: user.address,
                        city: user.city,
                        pincode: user.pincode,
                        state: user.state
                    }
                }
            
                transport.sendMail(mailOptions, (err, info) => {
                    if(err)
                        console.log("Error in sending email", err);
                    else {
                        console.log("Email about the order confirmation is send on id ", email);
                    }
                })
                
            }
        })
    }, 200);
});


app.post('/submitReview', (req, res) => {
    const {order_id, ratings, reviews, assign, email} = req.body;
    connection.query(`insert into ratings(order_id,email,ratings,reviews,assign) values('${order_id}','${email}','${ratings}','${reviews}','${assign}')`, (err, rows) => {
        if(err)
            console.log("Error in inserting data into database", err);
        else
        {
            res.send("OK");
        }
    })
});


app.post('/getReviews', (req, res) => {
    const {order_id} = req.body;
    
    connection.query(`select * from ratings where order_id=${order_id}`, (err, rows) => {
        if(err)
            console.log("Error in fetching data from the database", err);
        else 
        {
            res.send(rows[0]);
        }
    })
});

/*
 *       Fetch all the ratings and reviews for the given rider from the database in descending order of their dates.
 *       Fetch the details of the user for the each of the reviews and ratings. Send the detailed information back to the client
 */
app.post('/getRiderReviews', (req, res) => {
    const {id} = req.body;

    connection.query(`select * from ratings where assign=${id} order by rated_date desc`, (err, rows) => {
        if(err)
            console.log("Error in fetching data from the database", err);
        else
        {
            let reviewsArray = [];
            let totalRatings = 0;
            for(var i=0; i<rows.length; i++)
            {
                totalRatings += rows[i].ratings;
                let reviewTemp = {
                    email: rows[i].email,
                    reviews: rows[i].reviews,
                    rate: rows[i].ratings,
                    timestamp: months[new Date(rows[i].rated_date).getMonth()+1]+" "+new Date(rows[i].rated_date).getDate()+", "+new Date(rows[i].rated_date).getFullYear()
                }
                reviewsArray.push(reviewTemp);
            }

            for(var i=0; i<reviewsArray.length; i++)
                {
                    connection.query(`select * from customer where email='${reviewsArray[i].email}'`, (err, rows) => {
                        if(err)
                            console.log("Error in retrieving data from the database", err);
                        else
                        {
                            reviewsArray[i] ? reviewsArray[i].reviewTemp.name = rows[0].firstname : null;
                        }
                    })
                }
            totalRatings = totalRatings/rows.length;
            res.send({ratings: totalRatings, reviews: reviewsArray});
        }
    });
});



app.listen(5004, () => console.log("Listening on port 5004..."));