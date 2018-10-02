const express = require('express');
const Joi = require('joi');
const app = express();

//OBJETO QUE SERÁ USADO
app.use(express.json());

const genres = [
    {id: 1, name:'action'},
    {id: 2, name:'drama'},
    {id: 3, name:'adventure'}
]; 

app.get('/', (req, res) =>{
    res.send('Hello World');
});

app.get('/api/genres', (req, res) =>{
    res.send(genres);
});

app.get('/api/genres/:id', (req, res)=>{
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the given ID was not found');
    res.send(genre);
});

app.post('/api/genres', (req, res)=>{
    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    genres.push(genre);
    res.send(genre);
});

app.put('/api/genres/:id', (req, res)=>{
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the given ID was not found');
    
    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The course with the given ID was not found');
    
    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
});

function validateGenre(genre){
    const schema = {
        name : Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));