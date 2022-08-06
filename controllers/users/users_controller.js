const bcrypt = require("bcrypt");
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

        res.send("You have signed up!");
    },
};

module.exports = controller;
