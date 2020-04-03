const express = require('express');
const cors = require('cors')
var bodyParser = require('body-parser');
require('dotenv').config();
var MongoClient = require('mongodb').MongoClient;
const app = express();

const pass = process.env.DB_PASS;
const user = process.env.DB_USER;
var uri = `mongodb://${user}:${pass}@cluster0-shard-00-00-2jkon.mongodb.net:27017,cluster0-shard-00-01-2jkon.mongodb.net:27017,cluster0-shard-00-02-2jkon.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`;
app.use(cors());
app.use(bodyParser.json());


const users = ['name1', 'name2', 'name3', 'name4', 'name5', 'name6'];

app.get('/products', (req, rest) => {
    const user = req.body;
    MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(uri, function(err, client) {
        const collection = client.db("test").collection("devices");
        // perform actions on the collection object
        collection.find().limit(5).toArray((err, document)=>{
            if(err){
                console.log(err);
                rest.status(500).send({message:err});
            }
            else{
                rest.send(document);
            }
        })
        client.close();
      });
})

app.get('/fruits/banana', (req, res) => {
    res.send({banana: '100'});
})

app.get('/user/:id', (req, res) => {
    const userId = req.params.id;    
    const name = users[userId];
    res.send({userId, name});
})

//post

app.post('/addUser', (req, rest) => {
    const user = req.body;
    MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(uri, function(err, client) {
        const collection = client.db("test").collection("devices");
        // perform actions on the collection object
        collection.insertOne(user, (err, res)=>{
            console.log('success', res);
            rest.send(res.ops[0]);
        })
        client.close();
      });
      
    
})
const port = process.env.PORT;
app.listen(3000, () => console.log('listening to port 3000'));

