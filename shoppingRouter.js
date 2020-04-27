const express = require('express');
const router = new express.Router();
const items = require('./fakeDb');
const ExpressError = require('./errors');




router.get('/', (req, res, next) => {
    try{
        return res.json(items);
    }
    catch(e){
        next(e);
    }
})

router.post('/', (req, res, next) => {
    try{
        if (!Array.isArray(req.body)) {
            throw new ExpressError("Data must be sent in array", 400)
        }
        const added = [];;
        for (let item of req.body) {
           items.push(item);
           added.push(item);
        }   
        return res.send({added});
    }
    catch(e){
        next(e);
    }
})

router.get('/:name', (req, res, next) => {
    try{
        const item = items.find(val => {
            return val.name === req.params.name});
        if (item === undefined){
            throw new ExpressError("Item not found", 400);
        }
        return res.json(item);
    }
    catch(e){
        next(e);
    }
    
})

router.patch('/:name', (req, res, next) => {
    try{
        const item = items.find(val => {
            return val.name === req.params.name});
        if (item === undefined){
            throw new ExpressError("Item not found", 400);
        }
        
        item.name = req.body.name;
        item.price = req.body.price;

        return res.json({"updated": item});
    }
    catch(e){
        next(e);
    }
    
})

router.delete('/:name', (req, res, next) => {
    try{
        const idx = items.findIndex(val => {
            return val.name === req.params.name
        });
    
        if (idx === -1){
            throw new ExpressError("Item not found", 400)
        };
        
        items.splice(idx, 1);
    
        return res.json({"message": "Deleted"});
    }
    catch(e){
        next(e)
    }
})

module.exports = router;