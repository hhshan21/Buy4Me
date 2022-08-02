const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemsRequestedSchema = new Schema({
    username: { type: String },
    description: { type: String },
    country: { type: String },
    img: { type: String },
    quantity: { type: Number },
    price_offered: { type: Number },
});

module.exports = mongoose.model("ItemsRequested", itemsRequestedSchema);
