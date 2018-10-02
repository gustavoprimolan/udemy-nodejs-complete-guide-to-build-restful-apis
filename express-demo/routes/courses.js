const express = require('express');
const router = express.Router();

const courses = [
    {id: 1, name:'course1'},
    {id: 2, name:'course2'},
    {id: 3, name:'course3'}
];

router.get('/', (req, res) => {
    res.send(courses);
});

// /api/courses/1
router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found');//404 OBJECT NOT FOUND
    res.send(course);
});

router.post('/', (req, res) => {
    //DEFINIMOS UM OBJETO QUE DEVERÁ SER RECEBIDO COM O JOIN
    //POR EXEMPLO, DEVERÁ RECEBER UM SCHEMA
    //O SCHEMA DEVERÁ SER UMA STRING COM NO MÍNIMO 3 CARACTERES E É OBRIGATÓRIA
    //const schema = {
    //    name: Joi.string().min(3).required()    
    //};

    //const result = Joi.validate(req.body, schema);
    //console.log(result);

    //if(!req.body.name || req.body.name.length < 3) {
    //if(result.error){
    const { error } = validateCourse(req.body);
    //if(error){
    //404 BAD REQUEST
    //res.status(400).send(result.error);
    //res.status(400).send(result.error.details[0].message);
    //res.status(400).send(error.details[0].message);
    //return;
    //}

    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);

});

//QUERY PARAMETERS
router.get('/:year/:month', (req, res) => {
    //res.send(req.params);
    res.send(req.query);
});


router.put('/:id', (req, res) => {
    //Look up the course
    //If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found');//404 OBJECT NOT FOUND

    //Validate
    //If invalid, return 400 - Bad Request
    //CÓDIGO DUPLICADO, SERÁ REFATORADO PARA USAR TANTO NO MÉTODO PUT QUANTO NO POST
    //const schema = {
    //    name: Joi.string().min(3).required()
    //};
    //const result = Joi.validate(req.body, schema);

    //const result = validateCourse(req.body);
    const { error } = validateCourse(req.body); //PEGA DIRETO O ATRIBUTO ERROR DO OBJETO RETORNADO

    //if(result.error){
    //res.status(400).send(result.error.details[0].message);
    if (error) return res.status(400).send(error.details[0].message);

    //Update course
    //Return the updated course
    course.name = req.body.name;
    res.send(course);
});


router.delete('/:id', (req, res) => {
    //Look up the course
    //Not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found');

    //Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    //Return the same course
    res.send(course);

});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

module.exports = router;