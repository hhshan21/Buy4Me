const Request = require("../../models/requests/request");
// const Users = require("../../models/users/users");

const controller = {
    newRequest: (req, res) => {
        res.render("requests/request");
    },

    // create a new item request
    createRequest: async (req, res) => {
        const requestData = req.body;

        const newItemRequest = await Request.create({
            ...requestData,
            user: req.session.user.id,
        });
        res.redirect("/");
    },

    showEditRequestForm: async (req, res) => {
        const item = await Request.findById(req.params.request_id);

        res.render("requests/edit", { item });
    },

    update: async (req, res) => {
        const editItemRequest = await Request.findByIdAndUpdate();
        res.redirect("/");
    },

    delete: async (req, res) => {
        const delItemRequest = await Request.findByIdAndDelete();
        res.redirect("/");
    },
};

module.exports = controller;
