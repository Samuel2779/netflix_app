const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient
const path = require('path');

require('dotenv').config();

const port = process.env.PORT || 3000;

var db;

app.use(express.urlencoded({ extended: true }))
app.use(cors());

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.5f0qa.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;


MongoClient.connect(uri, 
    { useUnifiedTopology: true}
)
.then(client => {
    console.log('Connected to Database')
    db = client.db(`${process.env.DBNAME}`)
  })
    .catch(e => console.log(e));

   

/*  -----------------------------
    FIND MOVIE OR TV SERIES BY TITLE
    -----------------------------
*/
app.get('/findMovie/:title', (req, res) => {
    var query  = {title:  new RegExp(req.params.title), type: "Movie"};
    console.log("the title is: " + query.title);

        //TODO read an text from user and added in title
    db.collection('netflix_titles').find( query,{projection: {"title":1,"director":1, "cast":1, "country":1, "release_year":1, _id:0} }).toArray()
    .then(results => {
      console.log(results)
      res.send(results)
    })
    .catch(error => console.error(error))

})

app.get('/findTV/:title', (req, res) => {
    var query  = {title:  new RegExp(req.params.title), type: "TV Show"};
    console.log("the title is: " + query.title);

        //TODO read an text from user and added in title
    db.collection('netflix_titles').find( query,{projection: {"title":1,"director":1, "cast":1, "country":1, "release_year":1, _id:0} }).toArray()
    .then(results => {
      console.log(results)
      res.send(results)
    })
    .catch(error => console.error(error))

})

/*  -----------------------------
    NAME OF AN ARTIST
    -----------------------------
*/
app.get('/findArtist/:artist', (req, res) => {
    var query =  { $text: { $search: req.params.artist} };
    //TODO read an text from user and added in artist
db.collection('netflix_titles').find(query,{projection: {"title":1, _id:0} }).toArray()
.then(results => {
  console.log(results)
  res.send(results)
})
.catch(error => console.error(error))

})
/*  -----------------------------
    COUNT TOTAL MOVIES AND SERIES
    -----------------------------
*/
app.get('/countTotal', (req, res) => {
    //TODO add button functionality to activate
    console.log(uri);
db.collection('netflix_titles').count()
.then(results => {
  console.log(results)
  res.send({count : results})
})
.catch(error => console.error(error))

})
/*  -----------------------------
    TOTAL MOVIES OF A GIVEN COUNTRY
    -----------------------------
*/
app.get('/countTotalCountry/:country', (req, res) => {
    var query = {country: new RegExp(req.params.country) , type:"Movie"};
    //TODO read an text from user and added in country
db.collection('netflix_titles').find(query
    ).count()
.then(results => {
  console.log(results)
  res.send({count : results})
})
.catch(error => console.error(error))

})
/*  -----------------------------
    TOTAL SERIES OF A GIVEN YEAR
    -----------------------------
*/
app.get('/countTotalYear/:year', (req, res) => {
    var query = {release_year: req.params.year, type:"TV Show"};
    //TODO read an text from user and added in country
db.collection('netflix_titles').find(query
    ).count()
.then(results => {
  console.log(results)
  res.send({count : results})
})
.catch(error => console.error(error))

})

app.use(express.static(path.join(__dirname ,"../db-front" ,'build')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname,"../db-front" , 'build', 'index.html'));
  });

app.listen(port, () => {
    console.log('Server up and running', port)
})