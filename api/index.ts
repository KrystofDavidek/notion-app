import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import { createNote, createPage, createUser, createIcon } from "./test-data";

const app = express();
const port = 5000;
const uri = "mongodb+srv://xbetik:notion@cluster0.8ylwm.mongodb.net/notiondb?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(cors());

// Get all pages
app.get("/pages", async (req, res) => {
  try {
    const db = client.db("notiondb");
    const pages = await db.collection("Page").find({ deleted_at: null }).toArray();
    res.send(pages);
  } catch (err) {
    res.status(400).json({ error: "Pages do not exists" });
  }
});

// Get page by id
app.get("/page/:id", async (req, res) => {
  try {
    const db = client.db("notiondb");
    const query = { _id: new ObjectId(req.params.id), deleted_at: null };
    const page = await db.collection("Page").find(query).toArray();
    res.send(page);
  } catch (err) {
    res.status(400).json({ error: "Page does not exists" });
  }
});

// Get notes by page id
app.get("/page/:id/notes", async (req, res) => {
  try {
    const db = client.db("notiondb");
    const query = { page_id: new ObjectId(req.params.id), deleted_at: null };
    const notes = await db.collection("Note").find(query).toArray();
    res.send(notes);
  } catch (err) {
    res.status(400).json({ error: "Notes do not exists" });
  }
});

//  Create new note
app.post("/page/:id/note", async (req, res) => {
  let newNote;
  if (req.body.label) {
    newNote = createNote(new ObjectId(req.params.id), req.body.text, req.body.label);
  } else {
    newNote = createNote(new ObjectId(req.params.id), req.body.text);
  }
  try {
    const db = client.db("notiondb");
    const result = await db.collection("Note").insertOne(newNote);
    const note = result.ops[0];
    await db.collection("Note").updateOne(
      { _id: note.id },
      {
        $set: { id: parseInt(note._id.valueOf(), 16) },
      }
    );
    await db.collection("Page").updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: { modified_at: Date.now() },
      }
    );
    res.send(note);
  } catch (err) {
    res.status(400).json({ error: "Note was NOT inserted succesfully" });
  }
});

//  Modify note
app.put("/page/:pageId/note/:id", async (req, res) => {
  try {
    const db = client.db("notiondb");
    await db.collection("Note").updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          text: req.body.text,
          media_id: req.body.media_id,
          page_id: new ObjectId(req.body.page_id),
          order: req.body.order,
          label: req.body.label,
          created_at: req.body.created_at,
          modified_at: Date.now(),
          deleted_at: req.body.deleted_at,
        },
      }
    );
    await db.collection("Page").updateOne(
      { _id: new ObjectId(req.params.pageId) },
      {
        $set: { modified_at: Date.now() },
      }
    );
    res.send("Note is updated");
  } catch (err) {
    res.status(400).json({ error: "Problem with modification" });
  }
});

//  Delete new note
app.delete("/page/:pageId/note/:id", async (req, res) => {
  try {
    const db = client.db("notiondb");
    await db.collection("Note").updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: { deleted_at: Date.now() },
      }
    );
    await db.collection("Page").updateOne(
      { _id: new ObjectId(req.params.pageId) },
      {
        $set: { modified_at: Date.now() },
      }
    );
    res.send("Note is deleted!");
  } catch (err) {
    res.status(400).json({ error: "Page or note does not exists" });
  }
});

// Delete page
app.delete("/page/:id", async (req, res) => {
  try {
    const db = client.db("notiondb");
    const query = { _id: new ObjectId(req.params.id) };
    await db.collection("Page").updateOne(query, {
      $set: { deleted_at: Date.now() },
    });
    res.send("Page is deleted!");
  } catch (err) {
    res.status(400).json({ error: "Page does not exists" });
  }
});

//  Create new page
app.post("/page", async (req, res) => {
  const newPage = createPage(req.body.title);
  try {
    const db = client.db("notiondb");
    const result = await db.collection("Page").insertOne(newPage);
    res.send(result.ops[0]);
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
app.post("/user/:username/:password", async (req, res) => {
  const newUser = createUser(req.params.username, req.params.password);
  try {
    const db = client.db("notiondb");
    const id = (await db.collection("User").insertOne(newUser)).insertedId;
    res.send(id);
  } catch (err) {
    res.status(400).json({ error: "User was NOT inserted succesfully" });
  }
});

//  Get notes
app.get("/notes", async (req, res) => {
  try {
    const db = client.db("notiondb");
    const notes = await db.collection("Note").find().toArray();
    res.send(notes);
  } catch (err) {
    res.status(400).json({ error: "Notes do not exists" });
  }
});

//  Get note by id
app.get("/note/:id", async (req, res) => {
  try {
    const db = client.db("notiondb");
    const note = await db.collection("Note").find(new ObjectId(req.params.id)).toArray();
    res.send(note);
  } catch (err) {
    res.status(400).json({ error: "Note does not exists" });
  }
});

// Delete pages for TESTING
app.delete("/pages", async (req, res) => {
  try {
    const db = client.db("notiondb");
    await db.collection("Page").deleteMany({});
    res.send("Pages are deleted!");
  } catch (err) {
    res.status(400).json({ error: "Page does not exists" });
  }
});

// Delete notes for TESTING
app.delete("/notes", async (req, res) => {
  try {
    const db = client.db("notiondb");
    await db.collection("Note").deleteMany({});
    res.send("Notes are deleted!");
  } catch (err) {
    res.status(400).json({ error: "Notes does not exists" });
  }
});

// Get all page icons
app.get("/pageIcons", async (req, res) => {
  try {
    const db = client.db("notiondb");
    const icons = await db.collection("PageIcon").find({ deleted_at: null }).toArray();
    res.send(icons);
  } catch (err) {
    res.status(400).json({ error: "Icons do not exists" });
  }
});

//  Create new icon
app.post("/icon", async (req, res) => {
  const newIcon = createIcon(req.body.emojiData);
  try {
    const db = client.db("notiondb");
    const result = await db.collection("PageIcon").insertOne(newIcon);
    res.send(result.ops[0]);
  } catch (err) {
    res.status(400).json({ error: "Icon was NOT inserted succesfully" });
  }
});

// Update page icon id
app.put("/updatePageIcon/:pageId/:iconId", async (req, res) => {
  try {
    const db = client.db("notiondb");
    await db.collection("Page").updateOne(
      { _id: new ObjectId(req.params.pageId) },
      {
        $set: {
          icon_id: req.params.iconId,
        },
      }
    );
    res.send("OK");
  } catch (err) {
    res.status(400).json({ error: "Problem with modification" });
  }
});

// Switch page to board views
app.put("/switchPageToBoardView/:pageId", async (req, res) => {
  try {
    const db = client.db("notiondb");
    await db.collection("Page").updateOne(
      { _id: new ObjectId(req.params.pageId) },
      {
        $set: {
          isBoardView: true,
        },
      }
    );
    res.send("OK");
  } catch (err) {
    res.status(400).json({ error: "Problem with modification" });
  }
});

// Switch page to list view
app.put("/switchPageToListView/:pageId", async (req, res) => {
  try {
    const db = client.db("notiondb");
    await db.collection("Page").updateOne(
      { _id: new ObjectId(req.params.pageId) },
      {
        $set: {
          isBoardView: false,
        },
      }
    );
    res.send("OK");
  } catch (err) {
    res.status(400).json({ error: "Problem with modification" });
  }
});

// Change Page's parameter checkboxes to true
app.put("/switchCheckboxesOn/:pageId", async (req, res) => {
  try {
    const db = client.db("notiondb");
    await db.collection("Page").updateOne(
      { _id: new ObjectId(req.params.pageId) },
      {
        $set: {
          checkboxes: true,
        },
      }
    );
    res.send("OK");
  } catch (err) {
    res.status(400).json({ error: "Problem with modification" });
  }
});

// Change Page's parameter checkboxes to false
app.put("/switchCheckboxesOff/:pageId", async (req, res) => {
  try {
    const db = client.db("notiondb");
    await db.collection("Page").updateOne(
      { _id: new ObjectId(req.params.pageId) },
      {
        $set: {
          checkboxes: false,
        },
      }
    );
    res.send("OK");
  } catch (err) {
    res.status(400).json({ error: "Problem with modification" });
  }
});

//  Get icon by id
app.get("/icon/:id", async (req, res) => {
  try {
    const db = client.db("notiondb");
    const query = { unified: req.params.id };
    const icon = await db.collection("PageIcon").findOne(query);
    res.send(icon);
  } catch (err) {
    res.status(400).json({ error: "Icon does not exists" });
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
