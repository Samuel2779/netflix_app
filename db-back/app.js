const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient

require('dotenv').config();

const port = process.env.PORT || 3000;

var db;

app.use(bodyParser.urlencoded({ extended: true }))

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.5f0qa.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;


MongoClient.connect(uri, 
    { useUnifiedTopology: true}
)
.then(client => {
    console.log('Connected to Database')
    db = client.db(`${process.env.DBNAME}`)
  })
    .catch(e => console.log(e));

   

app.get('/', (req, res) => {
    res.send('Express try')

})
/*  -----------------------------
    FIND MOVIE OR TV SERIES BY TITLE
    -----------------------------
*/
app.get('/findMovie/:title', (req, res) => {
    var query  = {title:  new RegExp(req.params.title), type: "Movie"};
    console.log("the title is: " + query.title);

        //TODO read an text from user and added in title
    db.collection('netflix_titles').find( query,{projection: {"director":1, "cast":1, "country":1, "release_year":1, _id:0} }).toArray()
    .then(results => {
      console.log(results)
    })
    .catch(error => console.error(error))

})

app.get('/findTV/:title', (req, res) => {
    var query  = {title:  new RegExp(req.params.title), type: "TV Show"};
    console.log("the title is: " + query.title);

        //TODO read an text from user and added in title
    db.collection('netflix_titles').find( query,{projection: {"director":1, "cast":1, "country":1, "release_year":1, _id:0} }).toArray()
    .then(results => {
      console.log(results)
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
})
.catch(error => console.error(error))

})
/*  -----------------------------
    COUNT TOTAL MOVIES AND SERIES
    -----------------------------
*/
app.get('/countTotal', (req, res) => {
    //TODO add button functionality to activate
db.collection('netflix_titles').count()
.then(results => {
  console.log(results)
})
.catch(error => console.error(error))

})
/*  -----------------------------
    TOTAL MOVIES OF A GIVEN COUNTRY
    -----------------------------
*/
app.get('/countTotalCountry/:country', (req, res) => {
    var query = {country: req.params.country , type:"Movie"};
    //TODO read an text from user and added in country
db.collection('netflix_titles').find(query
    ).count()
.then(results => {
  console.log(results)
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
})
.catch(error => console.error(error))

})


app.listen(port, () => {
    console.log('Server up and running', port)
})