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
        console.log("validatedResults: ", validatedResults);

        try {
            await userModel.create({
                username: validatedResults.username,
                email: validatedResults.email,
                hash: hash,
            });
        } catch (err) {
            console.log(err);
            res.send("Failed to create user");
        }
        res.send("You have signed up!");
    },
};

module.exports = controller;
