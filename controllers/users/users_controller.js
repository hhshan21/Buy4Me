const userValidators = require("../validators/users");

const controller = {
    showSignUpForm: (req, res) => {
        res.render("pages/sign_up");
    },

    signUp: (req, res) => {
        // validations
        const validationResults = userValidators.registerValidator.validate(
            req.body
        );

        if (validationResults.error) {
            res.send("validation error occurred");
            return;
        }

        const validatedResults = validationResults.value;

        res.send("You have signed up!");
    },
};

module.exports = controller;
