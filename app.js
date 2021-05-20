const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Express try')

})

app.listen(port, () => {
    console.log('Server up and running', port)
})