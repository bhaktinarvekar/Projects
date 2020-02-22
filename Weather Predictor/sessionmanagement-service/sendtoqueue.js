var mongoose = require("mongoose");
mongoose.connect("mongodb+srv://bhakti:bhakti96@cluster0-bsj5f.mongodb.net/sessions", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
var sessionSchema = new mongoose.Schema({
    username: {type: String},
    year: {type: String},
    month: {type: String},
    day: {type: String},
    radar: {type: String},
    retrievetime : {type : Date},
    plottime : {type : Date},
    inserttime : {type: Date, default: Date.now}
});

Session = mongoose.model("Session", sessionSchema);

    var amqp = require("amqplib/callback_api");

    amqp.connect('amqp://localhost', (err, conn)=>{
        if(err)
            throw err;
        conn.createChannel((err1, channel1)=>{
            if(err1)
                throw err1;

            var queue = "session";
            channel1.assertQueue(queue, {durable : false});
            channel1.consume(queue, function(msg){
                console.log("Message received from queue: "+JSON.parse(msg.content));
                var json_msg = JSON.parse(msg.content);
                console.log(json_msg);
                var start_date = Object.values(json_msg)[1];
                var end_date = Object.values(json_msg)[0];
                var user_name = Object.values(json_msg)[2];
                var queue1 = "test";
                console.log("Data received from the UI is ", json_msg);
                console.log("Username", user_name);
                Session.find({"inserttime":{'$gte' : start_date, '$lte' : end_date}, "username" : user_name  
                }, (err, res)=>{
                    if(err)
                        console.log("error in session find")
                    if(res == undefined)
                        console.log(res);
                        else{
                                console.log("result returned from the database: ",res);
                                channel1.assertQueue(queue1, {durable : false});
                                channel1.sendToQueue(queue1, new Buffer(JSON.stringify(res)));
                                console.log("message sent to queue ", JSON.stringify(res));
                            }
                });
                channel1.ack(msg)   
            });
            

        });
    }); 
