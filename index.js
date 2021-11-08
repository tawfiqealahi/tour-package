const express = require('express');
const bodyParser = require("body-parser");
const { MongoClient } = require('mongodb');
// const { MongoClient } = require('mongodb').MongoClient;
// const ObjectId = require('ObjectId').ObjectId;
const ObjectId = require('mongodb').ObjectId;

const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// const uri = `mongodb+srv://tourpackagedbuser:lspcwfKAAXU6OSb2@cluster0.jvpmw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

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
    const ServiceCollection= client.db("tourPackage").collection("allServices");
    const OrderCollection= client.db("tourPackage").collection("orders");
 

      // perform actions on the collection object
//   client.close();


//  add confirm orders
    app.post("/Orders", async (req, res)=>{
      const result = await OrderCollection.insertOne(req.body);
      res.send(result);
          //  console.log(req.body) ;
       });


      //  get all services

       app.get("/allServices", async (req, res)=>{
        const result = await ServiceCollection.find({}).toArray();
        res.json(result);
        // console.log(req.body);
       })
      //  get all orders

       app.get("/allOrders", async (req, res)=>{
        const result = await OrderCollection.find({}).toArray();
        res.send(result);
       })

      //  get single orders
      app.get("/myOrders/:id", async (req, res)=>{
        // console.log(req.params.id);
        const result = await ServiceCollection.findOne({_id:ObjectId(req.params.id) });
        
        res.send(result);
        // console.log(result);
      })
      


});

app.listen(port, () => {
  console.log(`Example app listening tawfiq tawfiq http://localhost:${port}`)
})