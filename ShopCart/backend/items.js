const express = require('express')
const connection = require('./database.js');
const cors = require('cors');
const { connect } = require('react-redux');
const {months} = require('./store/store.js');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());


connection.connect((err) => {
    if(err)
        console.log("Error in establishing the connection to the Database in items.js...");
    else
        console.log("Connection established successfully in items.js...");
});

/*
 *      Fetch all the items from the database for the requested category and send the result back to the client.
 */
app.post('/displayItems', (req, res) => {
    const category = req.body.category;

    connection.query(`SELECT * FROM items where category="${category}"`, (err, rows) => {
        if(err)
            console.log("Error in fetching data from the database...", err);
        else
            return res.send(rows);
    })
});


/*
 *      Fetch all the categories from the database so that they can be displayed on the Dashboard
 */
app.get('/selectCategories', (req, res) => {
    connection.query(`SELECT * from categories`, (err, rows) => {
        if(err)
            console.log("Error in fetching data from the database...", err);
        else
        {
            return res.send(rows);
        }     
    })
});


/**
 *      Fetch all the items for the requested category and send an array of all the items to the client.
 *      Modify each item and make the quantity property in each object as zero
 */
app.post('/viewItems', (req, res) => {
    console.log(req.body);
    connection.query(`SELECT * from items where category="${req.body.name}"`, (err, rows) => {
        if(err)
            console.log("Error in fetching data from the database", err);
        else
            rows = rows.map(item => {
                item = {...item, quantity: 0};
                return item;
            });
            return res.send(rows);
    })
});


// Fetch all the items from the database
app.get('/allItems', (req, res) => {
    connection.query("SELECT * from items", (err, rows) => {
        if(err)
            console.log("Error in fetching data from the database", err);
        res.send(rows);
    })
});


/*
 *      Fetch an item from the database with the requested ID and category
 */
app.post('/getItem', (req, res) => {
    const {id, category} = req.body;
    connection.query(`SELECT * from items where category="${category}" and id="${id}"`, (err, rows) => {
        if(err)
            console.log("Unable to fetch data from the database", err);
        else{
            res.send(rows[0]);
        }
    })
})


/*
 *      Fetch all the items from the database such that either the item name or category matches to the searched value  
 */
app.post('/filterProducts', (req, res) => {
    const {value} = req.body;
    connection.query(`SELECT * from items where itemName like '%${value}%' or category like '%${value}%'`, (err, rows) => {
        if(err)
            console.log("Error in fetching the data from the database", err);
        rows = rows.map(elem => {
            elem = {...elem, quantity: 0}
            return elem;
        })
        res.send(rows);
    })
});


/*
 *      Iterate through each item in an array and insert them into the database with the requested order id
 */
app.post('/orderHistory', (req, res) => {
    const {cartItems, order_id, email} = req.body;
    var date = new Date();
    var dateTemp = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();

    for(var i=0; i<cartItems.length; i++)
    {
        connection.query(`insert into order_history(order_id, date, item_id, email, quantity, price) values(${order_id}, '${dateTemp}', ${cartItems[i].id}, '${email}', ${cartItems[i].quantity}, '${cartItems[i].price}')`, (err, rows) => {
            if(err)
                console.log("Error in inserting data into the database - order_history", err);
        })
    }
    return res.sendStatus(200);
});


/**
 *      Fetch all the items for the requested order_id and calculate the totalCost for the given order.
 *      Send an array containing all the items for the requested id along with the totalPrice back to the client.
 */
app.post('/orderedItems', (req, res) => {
    const {id, date, email} = req.body;
    let tempArray = [];
    let totalPrice = 0;
    
    connection.query(`select * from order_history where order_id=${id} and email='${email}'`, (err, rows) => {
        if(err)
            console.log("Error in fetching data from the database", err);
        else
        {
            const ids = rows.map(row => row.item_id);
            for(var i=0; i<rows.length; i++)
            {
                totalPrice = (parseFloat(totalPrice) + (parseFloat(rows[i].price) * parseFloat(rows[i].quantity))).toFixed(2);
                connection.query(`select * from items where id=${rows[i].item_id}`, (err, rows2) => {
                    if(err)
                        console.log("Error in fetching data from the database", err);
                    else{
                        tempArray.push({...rows2[0]});
                    }
                })
            }

            setTimeout(() => {
                for(var i=0; i<rows.length; i++)
                {
                    tempArray[i] = {...tempArray[i], quantity: rows[i].quantity, total_price: rows[i].price}
                }
                res.send({tempArray, totalPrice: totalPrice});
            }, 3000);   
        }
    })
});


/*
 *      Fetch all the distinct order id's from the order_history table for the requested email address.
 *      Iterate through each order and fetch the details about all the items from ITEM table for the given order.
 *      As each action is asynchronous, a timeout is set to push the details of all items for each order in a list and 
 *      also to send the response back to client.
 */
app.post('/getOrderHistory', (req, res) => {
    const {email} = req.body;
    let orderHistory = [];
    connection.query(`select distinct(order_id) from order_history where email='${email}' order by date desc`, (err, rows_1) => {
        if(err)
            console.log("Error in retrieving data from the database", err);
        else {
            for(var i=0; i<rows_1.length; i++)
            {
                connection.query(`select * from order_history where order_id=${rows_1[i].order_id}`, (err, rows_2) => {
                    if(err)
                        console.log("Error in fetching data from the database", err);
                    else {
                        let orders = [];
                        rows_2 = rows_2.map((row, index) => {
                            connection.query(`select * from items where id=${row.item_id}`, (err, rows_3) => {
                                if(err)
                                    console.log("Error in fetching data from the database", err);
                                else {
                                    var day = new Date(row.date).getDate();
                                    var month = new Date(row.date).getMonth();
                                    var year = new Date(row.date).getFullYear();
                                    var _date_ = months[month]+" "+day+", "+year;
                                    row = {...rows_3[0], quantity: row.quantity, price: row.price, date: _date_};
                                    orders.push(row);
                                    return row;
                                }
                            });
                        })
                        setTimeout(() => orderHistory.push(orders), 200);
                    }
                });
            }
        }

        setTimeout(() => {
            res.send(orderHistory);
        }, 3000);
    });
});


/**
 *      Fetch the order details for the requested order_id from the database.
 */
app.post("/getOrderDetails", (req, res) => {
    const { id } = req.body;
    connection.query(`select * from order_history where order_id=${id}`, (err, rows) => {
        if(err)
            console.log("Error in retrieving data from the database", err);
        else 
        {
            res.send(rows[0]);
        }
    })
})


app.listen(5002, () => console.log("Listening on port 5002..."));