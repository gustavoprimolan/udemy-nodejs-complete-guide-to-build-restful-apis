const {Rental, validate} = require('../models/rental');
const {Movie} = require('../models/movie');
const {Customer} = require('../models/customer');
const Fawn = require('fawn');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

Fawn.init(mongoose);

router.get('/', async(req, res) => {
    //ORDEM DESCENDENTE
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid customer.');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid movie.');

    if(Movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

    let rental = new Rental({
        //É SALVO TBM O ID, POIS PODE SER NECESSÁRIO ESSAS INFORMAÇÕES
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    //rental = await rental.save();
    //DIMINUI O NÚMERO DO STOCK
    //NO MONGODB NÃO EXISTE TRANSACTIONS, POIS IRÁ NECESSITAR AQUI.
    //PODE SER QUE OCORRA ERRO NA OPERAÇÃO DE CIMA E A DE BAIXO SEJA EXECUTADA
    //EXISTE UMA TÉCNICA QUE CHAMA TWO FACE COMMIT
    //movie.numberInStock--;
    //movie.save();

    //TWO FACE COMMIT
    try{
    
        new Fawn.Task()
            //NOME É CASE SENSITIVE E SEMPRE EM LOWERCASE
            .save('rentals', rental)
            .update('movies', {_id: movie._id}, {
                $inc: { numberInStock: -1 }
            })
            .run();
        
        res.send(rental);
    }
    catch(ex) {
        res.status(500).send('Something failed.');
    }
    
});

module.exports = router;