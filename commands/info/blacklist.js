const mongoose = require("mongoose")

const bl = new mongoose.Schema({
    	    Guild: String,
			Toggle: String,
})

module.exports = mongoose.model("blacklist", bl) 

