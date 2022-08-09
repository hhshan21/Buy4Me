require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();
const port = process.env.PORT || 3000;
const connStr = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@generalassembly.nrg3u.mongodb.net/?retryWrites=true&w=majority`;

const pageController = require("./controllers/pages/page_controller");
const userController = require("./controllers/users/users_controller");
const authMiddleware = require("./middlewares/auth_middleware");
const itemController = require("./controllers/items/item_controller");

// Set view engine
app.set("view engine", "ejs");

// Apply middlewares -> global variable
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false, httpOnly: false, maxAge: 7200000 },
    })
);
app.use(authMiddleware.setAuthUser);

// route to home page
app.get("/", pageController.showHome);

// Users Routes
app.get("/signup", userController.showSignUpForm);
app.post("/signup", userController.signUp);
app.get("/login", userController.showLoginForm);
app.post("/login", userController.login);
app.post("/logout", userController.logout);
app.get(
    "/request",
    authMiddleware.isAuthenticated,
    itemController.showRequestForm
);

app.get("/profile", authMiddleware.isAuthenticated, userController.showProfile);

app.listen(port, async () => {
    try {
        await mongoose.connect(connStr, { dbName: "Buy4Me" });
    } catch (err) {
        console.log("Failed to connect to DB");
        process.exit(1);
    }
    console.log(`Example app listening on port ${port}`);
});
