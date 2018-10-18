const express = require('express');
const router = express.Router();

const genres = [
    {id: 1, name:'action'},
    {id: 2, name:'drama'},
    {id: 3, name:'adventure'}
]; 

router.get('/', (req, res) =>{
    res.send(genres);
});

router.get('/:id', (req, res)=>{
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the given ID was not found');
    res.send(genre);
});

router.post('/', (req, res)=>{
    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    genres.push(genre);
    res.send(genre);
});

router.put('/:id', (req, res)=>{
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the given ID was not found');
    
    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(course);
});

router.delete('/:id', (req, res) => {
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

module.exports = router;