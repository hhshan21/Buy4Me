const Request = require("../../models/requests/request");
const Users = require("../../models/users/users");

const controller = {
    newItemRequestForm: async (req, res) => {
        res.render("requests/request");
    },

    createItemRequest: async (req, res) => {
        const requestData = req.body;
        requestData.username = req.session.username;

        console.log("requestData.username: ", requestData.username);
        console.log("requestData: ", requestData);

        const userProfile = await Users.find({
            username: requestData.username,
        });
        console.log("userProfile: ", userProfile);

        const newItemRequest = await Request.create(requestData);
        res.redirect("/");
    },
};

module.exports = controller;
