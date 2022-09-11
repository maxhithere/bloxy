const mongoose = require("mongoose")

const v3 = new mongoose.Schema({
    	    Guild: String,
			Role: Object,
})

module.exports = mongoose.model("v3", v3) 

