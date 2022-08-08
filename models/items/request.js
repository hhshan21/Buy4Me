const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema({
    // user: { type: Schema.Types.ObjectId, ref: "User" },
    username: { type: String },
    email: { type: String },
    img: { type: String },
    description: { type: String },
    country: { type: String },
    quantity: { type: Number },
    price_offered: { type: Number },
});

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
