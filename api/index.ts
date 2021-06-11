const express = require('express');
const app = express();
const port = 5000;
const uri = "mongodb+srv://xbetik:notion@cluster0.8ylwm.mongodb.net/notiondb?retryWrites=true&w=majority";
var ObjectId = require('mongodb').ObjectID;
var MongoClient = require('mongodb').MongoClient

// Get all pages
app.get('/get-pages/', function (req, res) {
    MongoClient.connect(uri, function (err, client) {
       if (err) throw err
       var db = client.db('notiondb')
       db.collection('Page').find().toArray(function (err, result) {
         if (err) throw err
         res.send(result)
       })
     })
 })

 // Get page by id
 app.get('/get-page/:id', function (req, res) {
    MongoClient.connect(uri, function (err, client) {
       if (err) throw err
       var db = client.db('notiondb')
       const result = db.collection('Page').find(ObjectId(req.params.id)).toArray(function (err, result) {
           if (err) throw err
           res.send(result);
       });
     })
 })

//  Create new page
 app.post('/create-page', (req, res) => {
    var newPage = createPage();
    res.send(insert("Page", newPage));
 })
 
//  Get users
app.get('/get-users', (req, res) => {
    MongoClient.connect(uri, function (err, client) {
        if (err) throw err
        var db = client.db('notiondb')
        const result = db.collection('User').find(ObjectId(req.params.id)).toArray(function (err, result) {
            if (err) throw err
            res.send(result);
        });
      })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// Insert into collection
function insert(collectionName, object) {
    MongoClient.connect(uri, function(err, client) {
        if (err) throw err
        var db = client.db('notiondb');
        db.collection(collectionName).insertOne(object, function(err, newobj) {
            if (err) throw err
            console.log("Object was inserted succesfully");
            return newobj.insertedId;
        })
    })
}

// Creating TEST objects

function createUser() {
    return {
        username: "Anonymous",
        created_at: Date.now(),
        modified_at: null,
        deleted_at: null
    }
}

function createPage(title="Page", userId=null, iconPath = null) {
    return {
        title: title,
        user_id: userId,
        modified_info_id: 10,
        icon_path: iconPath,
        created_at: Date.now(),
        modified_at: null,
        deleted_at: null
    }
}