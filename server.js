require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const methodOverride = require("method-override");

const app = express();
const port = process.env.PORT || 3000;
const connStr = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@generalassembly.nrg3u.mongodb.net/?retryWrites=true&w=majority`;

const pageController = require("./controllers/pages/page_controller");
const userController = require("./controllers/users/users_controller");
const authMiddleware = require("./middlewares/auth_middleware");
const requestController = require("./controllers/requests/request_controller");

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
app.use(methodOverride("_method"));

// route to home page
app.get("/", pageController.showHome);

// Users Routes
app.get("/signup", userController.showSignUpForm);
app.post("/signup", userController.signUp);
app.get("/login", userController.showLoginForm);
app.post("/login", userController.login);
app.post("/logout", userController.logout);
app.get("/profile", authMiddleware.isAuthenticated, userController.showProfile);
app.get(
    "/request",
    authMiddleware.isAuthenticated,
    requestController.newRequest
);
app.post(
    "/request",
    authMiddleware.isAuthenticated,
    requestController.createRequest
);
app.get(
    "/request/:request_id/edit",
    authMiddleware.isAuthenticated,
    requestController.showEditRequestForm
);
app.put(
    "/request/:request_id/edit",
    authMiddleware.isAuthenticated,
    requestController.edit
);
app.delete(
    "/request/:request_id/delete",
    authMiddleware.isAuthenticated,
    requestController.delete
);

app.listen(port, async () => {
    try {
        await mongoose.connect(connStr, { dbName: "Buy4Me" });
    } catch (err) {
        console.log("Failed to connect to DB");
        process.exit(1);
    }
    console.log(`Example app listening on port ${port}`);
});
