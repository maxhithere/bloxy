const mongoose = require("mongoose")

const vnickname = new mongoose.Schema({
    	    Guild: String,
			Toggle: {type: Boolean, default: false},
})

module.exports = mongoose.model("nicknameverify", vnickname) 

