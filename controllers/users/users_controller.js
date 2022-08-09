const bcrypt = require("bcrypt");
const Users = require("../../models/users/users");
const userValidators = require("../validators/users");

const controller = {
    showSignUpForm: (req, res) => {
        res.render("pages/signup");
    },

    signUp: async (req, res) => {
        // validations;
        const validationResults = userValidators.signUpValidator.validate(
            req.body
        );

        // error msg if signup form not completed or incorrect password entered
        if (validationResults.error) {
            res.send(
                "Please complete the form or key in the correct username/password!"
            );
            return;
        }

        const validatedResults = validationResults.value;

        // hash the password
        const hash = await bcrypt.hash(validatedResults.password, 10);

        // create the user and store in db
        try {
            await Users.create({
                username: validatedResults.username,
                email: validatedResults.email,
                hash: hash,
            });
        } catch (err) {
            console.log(err);
            res.send("Failed to create user");
            return;
        }
        res.redirect("/login");
    },

    showLoginForm: (req, res) => {
        res.render("pages/login");
    },

    login: async (req, res) => {
        // TO DO validations here

        const validatedResults = req.body;

        let user = null;

        // get user with username from DB
        try {
            user = await Users.findOne({
                username: validatedResults.username,
            });
        } catch (err) {
            res.send("Failed to get user");
            return;
        }

        // user bcrypt to compare the given password with the one stored in DB

        const pwMatches = await bcrypt.compare(
            validatedResults.password,
            user.hash
        );

        if (!pwMatches) {
            res.send("Please key in the correct username or password");
            return;
        }

        // log the user in by creating a session
        req.session.regenerate(function (err) {
            if (err) {
                res.send("unable to regenerate session");
                return;
            }

            // store user information in session, typically a user id
            req.session.username = user.username;

            // save the session before redirection to ensure page
            // load does not happen before session is saved
            req.session.save(function (err) {
                if (err) {
                    res.send("unable to save session");
                    return;
                }
                res.redirect("/");
            });
        });
    },

    showProfile: async (req, res) => {
        // get user data from db using session user
        let user = null;
        try {
            user = await Users.findOne({ username: req.session.user });
        } catch (err) {
            console.log(err);
            res.redirect("/login");
            return;
        }
        res.render("users/profile", { user });
    },

    logout: async (req, res) => {
        req.session.user = null;

        req.session.save(function (err) {
            if (err) {
                res.redirect("/login");
                return;
            }

            // regenerate the session, which is good practice to help
            // guard against forms of session fixation
            req.session.regenerate(function (err) {
                if (err) {
                    res.redirect("/login");
                    return;
                }

                res.redirect("/");
            });
        });
    },
};

module.exports = controller;
