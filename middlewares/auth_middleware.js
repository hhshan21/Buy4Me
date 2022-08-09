module.exports = {
    isAuthenticated: (req, res, next) => {
        // verify that the session user exist
        if (!req.session.user) {
            res.redirect("/login");
            return;
        }

        next();
    },

    setAuthUser: (req, res, next) => {
        res.locals.authUser = null;

        if (req.session.user) {
            res.locals.authUser = req.session.user;
        }

        next();
    },
};
