const express = require('express');
const router = express.Router(); 

const SubscriberSchema = require('../models/subscribers');

//get all subscribers
router.get('/', async (req,res) => {
  try{
    const subscribers = await SubscriberSchema.find();
    res.status(200).json(subscribers);
  }catch(err) {
    console.log(err)
  }
})

//get one subscriber
router.get('/:id', getSubscriber,(req,res) => {
  res.status(200).json(res.subscriber)
})

//create subscriber
router.post('/',async (req,res) => {
  const subscriber = new SubscriberSchema({
    name: req.body.name,
    subscribedTo: req.body.subscribedTo
  })
  try{
    const newSubscriber = await subscriber.save();
    res.status(201).json({newSubscriber})
  }catch (err){
    res.status(400).json({message: err.message})
  }
})

//update one subscriber
router.patch('/:id',getSubscriber, async (req,res) => {
  if (req.body.name != null) {
    res.subscriber.name  = req.body.name
  }
  if (req.body.subscribedTo != null) {
    res.subscriber.subscribedTo  = req.body.subscribedTo
  }
  try{
    const updatedUser = await res.subscriber.save();
    res.json(updatedUser);
  }catch(err) {
    console.log("having err", err)
    res.status(400).json({message: err.message})
  }
})


//delete one subscriber
router.delete('/:id',getSubscriber, async (req,res) => {
  try{
    await res.subscriber.remove()
    res.json({message: "Deleted Subscriber"})
  }catch (err) {
    res.status(500).json({message: err.message})
  }
})


async function getSubscriber(req,res,next) {
  let subscriber;
  try{
    subscriber = await SubscriberSchema.findById(req.params.id)
    if(subscriber == null) {
      return res.status(404).json("User not found")
    }
  }catch(err) {
    return res.status(500).json({message: err.message})
  }
  res.subscriber = subscriber;
  next();
}

module.exports =router;