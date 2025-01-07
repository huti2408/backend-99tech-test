import express from "express";
import 'dotenv/config'
import { MongoClient } from "mongodb";

const mongoUri = "mongodb+srv://saophaiquay2:10aotskXbrbtkXFE@personalblog.8p4qi.mongodb.net/?retryWrites=true&w=majority&appName=PersonalBlog"
const mongoClient = new MongoClient(mongoUri)
async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await mongoClient.connect();
      // Send a ping to confirm a successful connection
      await mongoClient.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the mongoClient will close when you finish/error
      await mongoClient.close();
    }
  }
  run()
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());

app.listen(PORT, () => {
    console.log("Server is running at PORT: " + PORT)
})
