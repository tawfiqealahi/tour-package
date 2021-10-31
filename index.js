const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require("body-parser");
// const { MongoClient } = require('mongodb').MongoClient;
// const ObjectId = require('ObjectId').ObjectId;

const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jvpmw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


// middlewere
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello tourist')
});
client.connect((err)=>{
    const productCollection= client.db("foodShop").collection("products");
    const orderCollection=client.db("foodShop").collection("orders");

      // perform actions on the collection object
  client.close();


    app.post("/order",(req, res)=>{
        productCollection.insertOne(req.body).then((result)=>{
            res.send(result.insertedId);
        //    console.log(result);
       });
});


});

app.listen(port, () => {
  console.log(`Example app listening tawfiq tawfiq http://localhost:${port}`)
})