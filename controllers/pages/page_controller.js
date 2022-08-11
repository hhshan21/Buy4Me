// const Users = require("../../models/users/users");
const Request = require("../../models/requests/request");

const controller = {
    showHome: async (req, res) => {
        const requests = await Request.find().populate("user", "username");
        // const userInfo = await Users.find().populate("email");
        // console.log("page_contr requests: ", requests);
        // console.log("page_contr userInfo: ", userInfo);
        // console.log("req.params: ", req.params);
        res.render("pages/home", { requests });
    },
};

module.exports = controller;
