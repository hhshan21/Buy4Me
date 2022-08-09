const Request = require("../../models/requests/request");
const Users = require("../../models/users/users");

const controller = {
    newItemRequestForm: async (req, res) => {
        res.render("requests/request");
    },

    createItemRequest: async (req, res) => {
        console.log("req.session: ", req.session);
        const requestData = req.body;
        // const userProfile = await Users.findById(`${req.session?.user?._id}`);
        // console.log("userProfile: ", userProfile);
        // console.log("req.session.user: ", req.session.user);
        // itemData.user = userProfile;
        const newItemRequest = await Request.create(requestData);
        res.redirect("/");
    },
};

module.exports = controller;
