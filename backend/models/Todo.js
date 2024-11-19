const mongoose = require('mongoose')
const { Schema } = mongoose

const TodoSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        compeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)
module.exports= mongoose.model('Todo',TodoSchema)