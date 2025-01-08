import express from "express";
import 'dotenv/config'
import mongoose from "mongoose";

const mongoUri = process.env.MONGO_URI || ''
mongoose.connect(mongoUri).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});
const app = express();
const PORT = process.env.PORT;
app.use(express.json());

app.listen(PORT, () => {
  console.log("Server is running at PORT: " + PORT)
})
