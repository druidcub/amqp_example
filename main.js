/*
const opcua = require("node-opcua");

// Let's create an instance of OPCUAServer
const server = new opcua.OPCUAServer({
    port: 4334, // the port of the listening socket of the server
    resourcePath: "/UA/MyLittleServer", // this path will be added to the endpoint resource name
     buildInfo : {
        productName: "MySampleServer1",
        buildNumber: "7658",
        buildDate: new Date(2014,5,2)
    }
});
*/

/*
var amqp = require('amqplib/callback_api');
amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    //var q = 'logs';

    //ch.assertQueue('logs', {durable: true});
    //ch.assertExchange('AAA', 'fanout', {durable: false});
    // Note: on Node 6 Buffer.from(msg) should be used
    //


    //nsole.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    //.consume('logs', function(msg) {
    //  console.log(" [x] Received %s", msg.content.toString());
    // {noAck: true});
    setInterval(() => {
        var timestamp = new Date().getTime().toString();
        //ch.sendToQueue(q, Buffer.from(timestamp));
        ch.publish('amq.topic', 'logs', Buffer.from(timestamp));
        
        console.log(" [x] Sent '" + timestamp +"'");
    }, 1000);
  });
});
*/
console.log("start!");
var amqp = require('amqplib/callback_api');
amqp.connect('amqp://orbit:xUser@10.90.9.216/%2FFAE', function(err, conn) {
  console.log("connected: " + err);
  conn.createChannel(function(err, ch) {
    //var q = 'logs';

    ch.assertQueue('msgQueue');
    ch.consume('msgQueue', (msg) => {
      if (msg !== null) {
        console.log(msg.content.toString());
        ch.ack(msg);
      } else {
        console.log('Consumer cancelled by server');
      }
    });
    
  });
});