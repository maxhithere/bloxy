const mongoose = require("mongoose")

const v = new mongoose.Schema({
    	    Guild: String,
			Role: Object,
})

module.exports = mongoose.model("verify", v) 

