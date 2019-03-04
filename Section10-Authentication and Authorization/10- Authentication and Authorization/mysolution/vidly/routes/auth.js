const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcryptjs = require('bcryptjs');
const _ = require('lodash');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send('Invalid email or password.');
    console.log(req.body.password);
    console.log(user.password);
    console.log(await bcryptjs.compare(req.body.password, user.password));
    //COMPARA PELO BCRYPT (HASH DO PASSWORD) SE O DO BANCO E O DA REQUISIÇÃO SÃO IGUAIS
    const validPassword = await bcryptjs.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password.');

    //PRIMEIRO PARAMETRO É O ID
    //SEGUNDO É UMA STRING
    const token = jwt.sign({_id: user._id}, 'jwtPrivateKey');

    res.send(token);

});


function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(req, schema);
}

module.exports = router;