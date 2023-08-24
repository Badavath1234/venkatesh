const express = require('express');
const app = express();
const PORT = 3001;
const cors = require("cors");
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/venkat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.log("Error connecting to MongoDB:", error));

app.use(cors());
app.use(express.json());

const personSchema = new mongoose.Schema({
  name: String,
  phone: String,
});

const Person = mongoose.model('Person', personSchema);

app.post("/add-person", async (req, res) => {
  try {
    const people = req.body;
    const insertedPeople = await Person.insertMany(people);
    res.json(insertedPeople);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/get-people", async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/delete-person/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Person.findByIdAndDelete(id);
    res.json({ message: "Person deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
