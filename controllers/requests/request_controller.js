const Request = require("../../models/requests/request");
const Users = require("../../models/users/users");

const controller = {
    newItemRequestForm: async (req, res) => {
        res.render("requests/request");
    },

    // create a new item request
    createItemRequest: async (req, res) => {
        // validate request
        if (!req.body) {
            res.status(400).send("Content cannot be empty!");
            return;
        }

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
