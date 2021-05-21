const express = require('express');
const app = express();

require('dotenv').config();

const port = process.env.PORT || 3000;

const mongoose = require('mongoose');


const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.5f0qa.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(uri, 
    {useNewUrlParser: true, useUnifiedTopology: true}
)
    .then(() => console.log('DB connected'))
    .catch(e => console.log(e))


app.get('/', (req, res) => {
    res.send('Express try')

})

app.listen(port, () => {
    console.log('Server up and running', port)
})