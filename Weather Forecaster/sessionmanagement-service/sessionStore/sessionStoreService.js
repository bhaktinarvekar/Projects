var mongoose = require("mongoose");
//var {username} = require("C:/Users/Bhakti/Documents/sessionService/routes/userlogin");
mongoose.connect("uri_to_your_mongo_table", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
var sessionSchema = new mongoose.Schema({
    username: {type: String},
    year: {type: String},
    month: {type: String},
    day: {type: String},
    radar: {type: String},
    retrievetime : {type : Date, default : Date.now},
    plottime : {type : Date, default : Date.now},
    inserttime : {type: Date, default: Date.now}
});
global.flag = null;
global.username = null;
Session = mongoose.model("Session", sessionSchema);
var amqp = require("amqplib/callback_api");

amqp.connect('amqp://rabbitmq-test', (err, conn)=>{
if(err)
    throw err;
else
    console.log("Connected to amqp...");
        conn.createChannel((err1, channel)=>{
            if(err1)
                throw err1;
            var queue = "receiveData";
            channel.assertQueue(queue, {durable : false});
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
            channel.consume(queue, (msg)=>{
                console.log("Data consumed " ,JSON.parse(msg.content));
                var user = JSON.parse(msg.content);
                if(Object.values(user).length > 3)
                {
                    var username = Object.values(user)[0];
                    var new_session = new Session(user);
                    new_session.save((err2, res)=>{
                    if(err2)
                        console.log("Error in saving into database");
					else
						console.log("data saved!!!");
                    });
                }
                else{
                        var status = Object.values(user)[1];
                        if(status == "plot")
                        {
                            var username = Object.values(user)[0];
                            console.log("In plot");
                            Session.findOneAndUpdate({"username" : username}, {
                                $set : {
                                    "plottime" : Object.values(user)[2]
                                }
                            }, {new : true}).exec();
                        }
                        else if(status = "retrieved")
                        {
                            var username = Object.values(user)[0];
                            Session.findOneAndUpdate({"username" : username}, {
                                $set : {
                                    "retrievetime" : Object.values(user)[2]
                                }
                            },{new : true}).exec();
                        }
                    }
                }, {noAck: true});
            });
}); 
