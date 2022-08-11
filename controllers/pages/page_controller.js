// const Users = require("../../models/users/users");
const Request = require("../../models/requests/request");

const controller = {
    showHome: async (req, res) => {
        const requests = await Request.find().populate("user", "username");
        // console.log("requests: ", requests);

        res.render("pages/home", { requests });
    },
};

module.exports = controller;
