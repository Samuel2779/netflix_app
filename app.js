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
app.get('/findMovie', (req, res) => {
        //TODO read an text from user and added in title
    db.collection('netflix_titles').find( {title:/^1/},{projection: {"director":1, "cast":1, "country":1, "release_year":1, _id:0} }).toArray()
    .then(results => {
      console.log(results)
    })
    .catch(error => console.error(error))

})

/*  -----------------------------
    NAME OF AN ARTIST
    -----------------------------
*/
app.get('/findArtist', (req, res) => {
    //TODO read an text from user and added in artist
db.collection('netflix_titles').find( { $text: { $search: "Bianca Comparato" } },{projection: {"title":1, _id:0} }).toArray()
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
app.get('/countTotalCountry', (req, res) => {
    //TODO read an text from user and added in country
db.collection('netflix_titles').find(
    {country:"United States", type:"Movie"}).count()
.then(results => {
  console.log(results)
})
.catch(error => console.error(error))

})
/*  -----------------------------
    TOTAL SERIES OF A GIVEN YEAR
    -----------------------------
*/
app.get('/countTotalYear', (req, res) => {
    //TODO read an text from user and added in country
db.collection('netflix_titles').find(
    {release_year:"2009", type:"TV Show"}).count()
.then(results => {
  console.log(results)
})
.catch(error => console.error(error))

})


app.listen(port, () => {
    console.log('Server up and running', port)
})