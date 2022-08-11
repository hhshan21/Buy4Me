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
        const requestId = req.params.request_id;
        console.log("requestId: ", requestId);

        const request = await Request.findById(requestId);
        console.log("request: ", request);
        res.render("requests/edit", { request });
    },

    edit: async (req, res) => {
        const requestId = req.params.request_id;
        const requestUpdate = req.body;
        const oldRequest = await Request.findById(requestId);
        const editItemRequest = await Request.findByIdAndUpdate();
        // res.redirect("/");
    },

    delete: async (req, res) => {
        const delItemRequest = await Request.findByIdAndDelete();
        res.redirect("/");
    },
};

module.exports = controller;
