const express = require('express');
const Joi = require('joi');
const app = express();
const genres = require('./routes/genres');

//OBJETO QUE SERÁ USADO
app.use(express.json());

app.use('/api/genres', genres);

app.get('/', (req, res) =>{
    res.send('Hello World');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));