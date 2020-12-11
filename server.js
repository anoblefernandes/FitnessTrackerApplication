const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
require('dotenv').config();
const Workout = require('./models/workout')

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitness", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.get('/exercises',(req, res)=>{
    res.sendFile(path.join(__dirname,'./public/exercise.html'))
})
app.get('/stats',(req, res)=>{
    res.sendFile(path.join(__dirname,'./public/stats.html'))
})
app.get('/api/workouts',(req, res)=>{
    Workout.find().then(workouts=>{
        res.json(workouts)
    }).catch(err=>res.json(err))
})
app.post('/api/workouts',(req, res)=>{
    Workout.create({}).then(workout=>{
        res.json(workout)
    }).catch(err=>res.json(err))
})
app.put('/api/workouts/:id',(req, res)=>{
    const content = req.body
    const id = req.params.id
    Workout.findByIdAndUpdate(id, {$push:{exercises:content}}).then(workout=>{
        res.json(workout)
    }).catch(err=>res.json(err))
})
app.delete('/api/workouts',(req, res)=>{
    const id = req.body.id
    Workout.findByIdAndDelete(id).then(()=>res.json({})).catch(err=>res.json(err))
})
app.get('/api/workouts/range',(req, res)=>{
    Workout.find({}).limit(7).then(workouts=>{
        res.json(workouts)
    }).catch(err=>res.json(err))
})
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
