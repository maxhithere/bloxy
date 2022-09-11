const mongoose = require("mongoose")

const logSetup = new mongoose.Schema({
    id: String,
    channel: String,

});


module.exports = mongoose.model("verifyWebhookLogs", logSetup) 

