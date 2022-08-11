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
        const request = await Request.findById(req.params.request_id);

        res.render("requests/edit", { request });
    },

    edit: async (req, res) => {
        try {
            const requestId = req.params.request_id;
            const requestUpdate = req.body;

            const editItemRequest = await Request.findByIdAndUpdate(
                requestId,
                { ...requestUpdate },
                { new: true }
            );
        } catch (err) {
            console.log(err);
        }

        res.redirect("/");
    },

    delete: async (req, res) => {
        try {
            const editItemRequest = await Request.findByIdAndDelete(requestId);
        } catch (err) {
            console.log(err);
        }
        res.redirect("/");
    },
};

module.exports = controller;
