const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true } };
const workoutSchema = new Schema(
    {
        day: {
            type: Date, 
            default: Date.now(),
        },
        exercises: [{
            type: {
                type:String,
                required:"Exercise type is required!"
            },
            name: {
                type:String,
                required:"Exercise name is required!"
            },
            duration: {
                type:Number,
                required:"Exercise duration is required"
            },
            weight: {
                type:Number,
            },
            reps: {
                type:Number,
            },
            sets: {
                type:Number,
            },
            distance: {
                type:Number,
            },
        }]
    },opts
)
workoutSchema.virtual('totalDuration').get(function() {
    const exercisesArray = this.exercises;
    return exercisesArray.reduce((acc, cur)=>{
        return acc+cur.duration
    })
  });
const Workout = mongoose.model("Workout" , workoutSchema)

module.exports = Workout