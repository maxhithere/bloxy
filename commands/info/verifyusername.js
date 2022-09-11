const mongoose = require("mongoose")

const ve = new mongoose.Schema({
    	    User: String,
            ID: String,
            Member: String,
})

module.exports = mongoose.model("verifyusername", ve) 

