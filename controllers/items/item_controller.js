const Items = require("../../models/items/request");
const Users = require("../../models/users/users");

const controller = {
    newItemRequestForm: async (req, res) => {
        res.render("items/request");
    },

    createItemRequest: async (req, res) => {
        console.log("req.session: ", req.session);
        const itemData = req.body;
        const userProfile = await Users.findById(`${req.session?.user?._id}`);
        console.log("userProfile: ", userProfile);
        // console.log("req.session.user: ", req.session.user);
        // itemData.author_id = userProfile._id;
        const newItemRequest = await Items.create(itemData);
        res.redirect("/");
    },
};

module.exports = controller;
