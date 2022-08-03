const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemsRequestedSchema = new Schema({
    username: { type: String },
    img: { type: String },
    description: { type: String },
    country: { type: String },
    quantity: { type: Number },
    price_offered: { type: Number },
});

const ItemsRequested = mongoose.model("ItemsRequested", itemsRequestedSchema);

module.exports = ItemsRequested;
