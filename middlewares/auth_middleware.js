module.exports = {
    isAuthenticated: (req, res, next) => {
        // verify that the session user exist
        if (!req.session.username) {
            res.redirect("/login");
            return;
        }

        next();
    },

    setAuthUser: (req, res, next) => {
        res.locals.authUser = null;

        if (req.session.username) {
            res.locals.authUser = req.session.username;
        }

        next();
    },
};
