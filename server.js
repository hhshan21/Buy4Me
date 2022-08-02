require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const pageController = require("./controllers/pages/page_controller");

// route to home page
app.get("/", pageController.showHome);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
