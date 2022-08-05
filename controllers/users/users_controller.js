const userValidators = require("../validators/users");

const controller = {
    showSignUpForm: (req, res) => {
        res.render("pages/signup");
    },

    signUp: (req, res) => {
        // validations
        const validationResults = userValidators.signUpValidator.validate(
            req.body
        );

        console.log("validationResults", validationResults);

        if (validationResults.error) {
            res.send("validation error occurred");
            return;
        }

        const validatedResults = validationResults.value;

        res.send("You have signed up!");
    },
};

module.exports = controller;
