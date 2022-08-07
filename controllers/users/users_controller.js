const bcrypt = require("bcrypt");
const userModel = require("../../models/users/users");
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
            await userModel.create({
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
        // validations here

        const validatedResults = req.body;
        console.log("validatedResults: ", validatedResults);

        let user = null;

        // get user with username from DB
        try {
            user = await userModel.findOne({
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
            if (err) next(err);

            // store user information in session, typically a user id
            req.session.user = req.body.user;

            // save the session before redirection to ensure page
            // load does not happen before session is saved
            req.session.save(function (err) {
                if (err) return next(err);
                res.redirect("/");
            });
        });

        res.send("Login success!");
    },
};

module.exports = controller;
