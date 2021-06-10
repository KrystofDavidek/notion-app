const express = require('express')
const app = express()
const port = 5000
var data = []

var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb+srv://xbetik:notion@cluster0.8ylwm.mongodb.net/notiondb?retryWrites=true&w=majority', (err, client) => {
    var db = client.db("notiondb");

    db.collection('Page').find().toArray(function(err, result) {
        if (err) throw err

        console.log(result)
        data = result
        client.close();
        // db.collection('page').insertOne("Second Page");
    })
})

app.get('/backend', (req, res) => {
    res.send(data)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})