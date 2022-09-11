const mongoose = require("mongoose")

const twitter = new mongoose.Schema({
    	    Guild: String,
			Channel: Object,
            Role: Object,
			Tweet: String,
})

module.exports = mongoose.model("twitter", twitter) 

