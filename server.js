require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const connStr = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@generalassembly.nrg3u.mongodb.net/?retryWrites=true&w=majority`;

const pageController = require("./controllers/pages/page_controller");
const userController = require("./controllers/users/users_controller");

// route to home page
app.get("/", pageController.showHome);

//Users Routes
app.get("/signup", userController.signUp);

app.listen(port, async () => {
    try {
        await mongoose.connect(connStr, { dbName: "Buy4Me" });
    } catch (err) {
        console.log("Failed to connect to DB");
        process.exit(1);
    }
    console.log(`Example app listening on port ${port}`);
});
