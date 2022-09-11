const mongoose = require("mongoose")

const v2 = new mongoose.Schema({
    	    Guild: String,
			Channel: Object,
})

module.exports = mongoose.model("verify2", v2) 

