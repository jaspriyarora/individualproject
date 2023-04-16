const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const userSchema = new Schema({
    data:{
        type: String,
        required: true
    },
    status:{
        type:String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
});

const Test2 = mongoose.model('Test2', userSchema);
// Test2.createIndexes();
module.exports = Test2;