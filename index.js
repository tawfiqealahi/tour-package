const { MongoClient } = require("mongodb");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;

const app = express();
const port = process.env.PORT || 5000;

// midleware
app.use(cors());
app.use(express.json());

// ki
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jvpmw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("tourPackage");
    const productsCollection = database.collection("products");
    const orderCollection = database.collection("order");
    const reviewCollection = database.collection("review");
    const usersCollection = database.collection("users");

    // get all product from database
    app.get("/products", async (req, res) => {
      const result = await productsCollection.find({}).toArray();
      res.send(result);
      // console.log(result);
    });

    // add a product
    app.post("/addProducts", async (req, res) => {
      const addProducts = await productsCollection.insertOne(req.body);
      res.send(addProducts);
    });

    //get order product
    app.get("/products/:id", async (req, res) => {
      const query = req.params.id;
      const result = await productsCollection
        .find({ _id: ObjectId(query) })
        .toArray();
      res.send(result[0]);
    });

    //delete
    app.delete("/products/:id", async (req, res) => {
      const query = { _id: ObjectId(req.params.id) };
      const deleted = await productsCollection.deleteOne(query);
      res.send(deleted);
    });

    //post order
    app.post("/addOrder", async (req, res) => {
      const order = await orderCollection.insertOne(req.body);
      res.send(order);
      console.log(order);
    });

    //get all order
    app.get("/allOrder", async (req, res) => {
      const allOrder = await orderCollection.find({}).toArray();
      res.send(allOrder);
    });

    //order delete
    app.delete("/allOrder/:id", async (req, res) => {
      const query = { _id: ObjectId(req.params.id) };
      const deleted = await orderCollection.deleteOne(query);
      res.send(deleted);
    });

    //my order
    app.get("/myOrder/:email", async (req, res) => {
      const email = { email: req.params.email };
      const myOrder = await orderCollection.find(email).toArray();
      res.send(myOrder);
    });

    //remove my order
    app.delete("/myOrder/:id", async (req, res) => {
      const query = { _id: ObjectId(req.params.id) };
      const result = await orderCollection.deleteOne(query);
      res.send(result);
    });

    //addReview
    app.post("/addReview", async (req, res) => {
      const result = await reviewCollection.insertOne(req.body);
      res.send(result);
    });

    //get all review
    app.get("/allReview", async (req, res) => {
      const review = await reviewCollection.find({}).toArray();
      res.send(review);
    });

    //status update
    app.put("/status/:id", async (req, res) => {
      const fillter = { _id: ObjectId(req.params.id) };
      const updated = await orderCollection.updateOne(fillter, {
        $set: {
          status: req.body.status,
        },
      });
      res.send(updated);
    });

    //user data
    app.post("/userData", async (req, res) => {
      const user = await usersCollection.insertOne(req.body);
      res.send(user);
    });

    app.put("/makeAdmin", async (req, res) => {
      const filter = { email: req.body.email };
      const result = await usersCollection.find(filter).toArray();
      if (result) {
        const newAdmin = await usersCollection.updateOne(filter, {
          $set: {
            role: "admin",
          },
        });
        console.log(newAdmin);
      }
    });

    //admin
    app.get("/admin/:email", async (req, res) => {
      const email = { email: req.params.email };
      const admin = await usersCollection.find(email).toArray();
      res.send(admin);
    });
  } finally {
    //  await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Niche Products Server Run");
});
app.listen(port, () => {
  console.log("Niche Tawfiq product server at port", port);
});
