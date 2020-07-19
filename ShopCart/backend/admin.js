const express = require('express');
const connection = require('./database.js');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

connection.connect((err) => {
    if(err)
        console.log("Error in establishing the connection to the Database in admin.js...");
    else
        console.log("Connection established successfully in admin.js...");
})


/*
 *      Created a constant 'storage' using multer (helps in storing files of differnt types) package which stores the file at 
 *      a location specifed in "destination" function and with the filename specified in "filename" function
 */
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'D:/grocery_shopping/GroceryShopping/frontend/frontend/src/static/images/uploads');
    },
    filename(req, file, cb){
        cb(null, file.originalname);
    }
})

/**
 *      Accepts the files of the format - image/jpeg or image/png otherwise raises an error
 */
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }
    else
        cb("Accepted file format is either jpeg/jpg or png", false);
}


/**
 *      Create a middleware using "multer" package and configure the multer by specifying the storage(location and filename of the
 *      file to be stored), file size and file filter(which accepts the file of the type image/jpeg or image/png)
 */
var upload = multer(
{
    storage: storage, 
    limits: {
    fileSize: 1024*1024*5
    },
    fileFilter: fileFilter
});


/*
 *         Calls the middleware "upload" which stores the file in the specified location and name. Further, check if the 
 *         directory already exists or not. If the directory is not present then create a directory with the name.
 *         In order to move the file into the desired directory, rename the file with the file path of destination. Also,
 *         make the entry of the new category into the database.
 */
app.post('/addNewCategory', upload.single('fileUploaded'), (req, res) => {
    
    const basePath = 'D:/grocery_shopping/GroceryShopping/frontend/frontend/src/static/images/';
    let dir = basePath + req.body.name;
    
    fs.exists(dir, exists => {
        if(!exists)
        {
            fs.mkdir(dir, err => {
                if(err)
                    console.log("Error in creating new directory",err);
            });

            let path = req.body.name;
            let name = path;
            name = (name.replace('_', ' '));
            connection.query(`insert into categories(name, path) values('${name}', '${path}')`, (err, rows) => {
                if(err)
                    console.log("Error in inserting data into the database", err);
            })
        }
        else{
            console.log("Directory already exists");
        }

        let fileName = req.file.originalname;
        fs.rename(basePath + 'uploads'+ '\\'+ fileName, dir+ '\\' + fileName, err => {
            if(err)
                console.log("Error in moving the file ", err);
        })

    })
    res.send(req.file);
    
});


/*
 *      Call the middleware "multer" which stores the file in the some predefined location. To move the file into the given
 *      category, rename the file. Also, make the entry of the new product into the database.      
 */
app.post('/addNewProduct', upload.single('fileUploaded'), (req, res) => {
    const {productName, price, category} = req.body;
    const basePath = 'D:/grocery_shopping/GroceryShopping/frontend/frontend/src/static/images/';
    let dir = basePath + category.toLowerCase();
    fs.exists(dir, exists => {
        if(!exists)
            res.send("Error in adding product");
        else 
        {
            let path = (req.file.originalname).split('.');
            connection.query(`insert into items(itemName,category,path,price,items) values('${productName}','${category}','${path[0]}','${price}','30')`, (err, rows) => {
                if(err)
                    console.log("Error in inserting data into the database", err);
            })
            fs.rename(basePath+'uploads'+ "\\"+req.file.originalname, dir+"\\"+req.file.originalname, err => {
                if(err)
                    console.log("Error in renaming the file",err);
                res.send(req.file);
            })
        }
    });


app.post('/getRider', (req, res) => {
    const { id } = req.body;
    connection.query(`select * from riders where id=${id}`, (err, rows) => {
        if(err)
            console.log("Error in fetching data from the database", err);
        else
        {
            res.send(rows);
        }
    });
})  
})

app.listen(5003, () => console.log("Listening on port 5003..."));