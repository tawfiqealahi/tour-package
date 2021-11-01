const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require("body-parser");
// const { MongoClient } = require('mongodb').MongoClient;
// const ObjectId = require('ObjectId').ObjectId;

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
    const productCollection= client.db("tourPackage").collection("services");

    // const orderCollection=client.db("tourPackage").collection("orders");

      // perform actions on the collection object
//   client.close();


    app.post("/orders",(req, res)=>{
        productCollection.insertOne(req.body).then((result)=>{
            res.send(result.insertedId);
        //    console.log(result);
       });

});

app.get("/searchValue", async (req, res)=>{
    const result = await SearchResult.find({Package: {$regex: req.query.search},
    }).toArray();
    res.send(result);

    // console.log(req.query.search);
});
// get all orders

app.get("/allorders", async (req, res)=>{
    const result = await allOrders.find({}).toArray();
    res.send(result);
    // console.log(result);
});
 // delete event

 app.delete("/deleteEvent/:id", async (req, res) => {
    console.log(req.params.id);
    const result = await EventsCollection.deleteOne({
      _id: ObjectId(req.params.id),
    });
    res.send(result);
  });
  // my orders

  app.get("/myorders/:email", async (req, res) => {
    const result = await EventsCollection.find({
      email: req.params.email,
    }).toArray();
    res.send(result);
  });


});

app.get('/', (req, res) => {
  console.log('final')
});

app.listen(port, () => {
  console.log(`Example app listening tawfiq tawfiq http://localhost:${port}`)
})