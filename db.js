const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://jaspriya4811be21:<password>@cluster0.5twfivw.mongodb.net/test";
// const mongoURI = "mongodb+srv://rahulgoyal9418:rahulgoel@cluster0.atlnfor.mongodb.net/cloudnote?retryWrites=true&w=majority";
const connectToMongo = () => {
    
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoURI)
    .then( ()=> {
        console.log("connected");
    })

}

module.exports = connectToMongo;