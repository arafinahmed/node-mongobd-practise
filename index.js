const express = require('express');
const cors = require('cors')
var bodyParser = require('body-parser');
require('dotenv').config();
//new connection setting
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbUser:v9qBO7a2jCDdw2p6@cluster0-2jkon.mongodb.net/test?retryWrites=true&w=majority";


//var MongoClient = require('mongodb').MongoClient;
const app = express();

const pass = process.env.DB_PASS;
const user = process.env.DB_USER;
//var uri = `mongodb://${user}:${pass}@cluster0-shard-00-00-2jkon.mongodb.net:27017,cluster0-shard-00-01-2jkon.mongodb.net:27017,cluster0-shard-00-02-2jkon.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`;
app.use(cors());
app.use(bodyParser.json());


const users = ['name1', 'name2', 'name3', 'name4', 'name5', 'name6'];
app.get('/', (req,res) => {
    console.log('100');
    res.send('100');
})
app.get('/products', (req, rest) => {
    const user = req.body;
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        console.log('ashche');
        const collection = client.db("test").collection("devices");
        // perform actions on the collection object
        console.log('connected');
        collection.find().toArray((err, document)=>{
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

app.post('/addUser', (req, res) => {
    const product = req.body;
    console.log(product);
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("test").collection("devices");
        collection.insertOne(product, (err, result)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(result.ops[0]);
            }
        });
        client.close();
      });
    
      
    
})




const port = process.env.PORT;
app.listen(3000, () => console.log('listening to port 3000'));

