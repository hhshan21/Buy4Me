const Request = require("../../models/requests/request");

const controller = {
    showHome: async (req, res) => {
        const requests = await Request.find().exec();

        res.render("pages/home", { requests });
    },
};

module.exports = controller;
