const mongoose = require('mongoose')

const dockerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

module.exports = Item = mongoose.model("dockerItem", dockerSchema)