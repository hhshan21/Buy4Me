// const itemModel = require("../../models/items_requested");

const controller = {
    showSignUpForm: (req, res) => {
        res.render("pages/sign_up");
    },

    signUp: (req, res) => {
        res.send("Hello");
    },
};

module.exports = controller;
