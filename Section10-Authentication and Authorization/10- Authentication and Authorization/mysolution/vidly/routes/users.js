const _ = require('lodash');
const {User, validateUser} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    
    const { error } = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('User already registered.');

    /*
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    */
    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    await user.save();

    //PEGA APENAS AS PROPRIEDADES name e email DO OBJETO
    res.send(_.pick(user, ['_id', 'name', 'email']));

    //PARA EXCLUIR A SENHA AO RETORNAR AO CLIENTE
    //UMA SOLUÇÃO:
    //res.send({
    //    name: user.name,
    //    email: user.email
    //});
    //OUTRA SOLUÇÃO É UTILIZAR O LODASH

});

module.exports = router;