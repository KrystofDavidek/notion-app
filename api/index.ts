import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import { createPage, createUser } from "./test-data";

const app = express();
const port = 5000;
const uri = "mongodb+srv://xbetik:notion@cluster0.8ylwm.mongodb.net/notiondb?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get all pages
app.get("/pages", async (req, res) => {
  try {
    const db = client.db("notiondb");
    const pages = await db.collection("Page").find().toArray();
    res.send(pages);
  } catch (err) {
    res.status(400).json({ error: "Pages do not exists" });
  }
});

// Get page by id
app.get("/pages/:id", async (req, res) => {
  try {
    const db = client.db("notiondb");
    const page = await db.collection("Page").find(new ObjectId(req.params.id)).toArray();
    res.send(page);
  } catch (err) {
    res.status(400).json({ error: "Page does not exists" });
  }
});

//  Create new page
app.post("/page", async (req, res) => {
  const newPage = createPage();
  try {
    const db = client.db("notiondb");
    const id = (await db.collection("Page").insertOne(newPage)).insertedId;
    res.send(id);
  } catch (err) {
    res.status(400).json({ error: "Page was NOT inserted succesfully" });
  }
});

//  Get users
app.get("/users", async (req, res) => {
  try {
    const db = client.db("notiondb");
    const users = await db.collection("User").find().toArray();
    res.send(users);
  } catch (err) {
    res.status(400).json({ error: "Users do not exists" });
  }
});

//  Get user by id
app.get("/user/:id", async (req, res) => {
  try {
    const db = client.db("notiondb");
    const user = await db.collection("User").find(new ObjectId(req.params.id)).toArray();
    res.send(user);
  } catch (err) {
    res.status(400).json({ error: "User does not exists" });
  }
});

//  Create new user
app.post("/user", async (req, res) => {
  const newUser = createUser();
  try {
    const db = client.db("notiondb");
    const id = (await db.collection("User").insertOne(newUser)).insertedId;
    res.send(id);
  } catch (err) {
    res.status(400).json({ error: "User was NOT inserted succesfully" });
  }
});

async function run() {
  client.connect();
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}

run()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => client.close());
