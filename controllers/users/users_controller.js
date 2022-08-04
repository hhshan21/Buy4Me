// const itemModel = require("../../models/items_requested");

const controller = {
    showSignUpForm: async (req, res) => {
        res.render("pages/sign_up");
    },
};

module.exports = controller;
