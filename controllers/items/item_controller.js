const controller = {
    newRequestForm: async (req, res) => {
        res.render("items/request");
    },

    createRequest: async (req, res) => {
        console.log("req.body: ", req.body);
        console.log("req.session: ", req.session);
        // const projectData = req.body;
        // const profileOwner = await Users.findById(
        //     `${req.session?.currentUser?._id}`
        // );
        // projectData.author_id = profileOwner._id;
        // const newProject = await Projects.create(projectData);
        // res.redirect(`/projects/${newProject._id}`);
    },
};

module.exports = controller;
