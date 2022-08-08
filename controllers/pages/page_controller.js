const itemModel = require("../../models/items/request");

const controller = {
    showHome: async (req, res) => {
        const items = await itemModel.find().exec();

        res.render("pages/home", { items });
    },
};

module.exports = controller;
