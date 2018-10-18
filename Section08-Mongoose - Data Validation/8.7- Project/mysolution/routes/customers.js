const { Customer, validateCustomer } = require('../models/customer'); //Destructing the objetc
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    //PEGA GENEROS E ORDENA POR NOME
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body); 

    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });

    customer = await customer.save();

    res.send(customer);
});

router.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const Customer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name}, {
        new: true
    });

    if (!Customer) return res.status(404).send('The customer with the given ID was not found.');

    Customer.name = req.body.name; 
    res.send(Customer);
});
  
router.delete('/:id', async (req, res) => {
    const customer = await Genre.findByIdAndRemove(req.params.id);

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
});
  
router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
});
  
modules.exports = router;