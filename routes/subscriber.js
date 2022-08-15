const express = require('express');
const router = express.Router(); 

//get all subscribers
router.get('/', (req,res) => {
  res.status(200).json({message: "all done"})
})

//get one subscriber
router.get('/:id', (req,res) => {
  
})

//create subscriber
router.post('/:id', (req,res) => {
  
})

//update one subscriber
router.patch('/:id', (req,res) => {
  
})


//delete one subscriber
router.post('/:id', (req,res) => {
  
})

module.exports =router;