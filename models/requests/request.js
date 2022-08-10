const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    img: { type: String, required: true },
    description: { type: String, required: true },
    country: { type: String, required: true },
    quantity: { type: Number, required: true },
    price_offered: { type: Number, required: true },
});

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
