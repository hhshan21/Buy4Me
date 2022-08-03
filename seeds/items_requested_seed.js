require("dotenv").config();
const mongoose = require("mongoose");
const itemRequested = require("../models/items_requested");

const data = [
    {
        username: "starskitten",
        img: "https://www.tnp.sg/sites/default/files/styles/large-portrait/public/articles/2019/09/19/NP_20190919_NTUC19JOXD_5125229.jpg?itok=bi5CuWqz",
        description: "Little Prince instant noodle",
        country: "Taiwan",
        quantity: 6,
        price_offered: 8,
    },
    {
        username: "toastie",
        img: "https://japan-trip-culture.com/wp-content/uploads/2019/05/Screen-Shot-2019-05-05-at-12.28.11-AM.png",
        description: "Jyagariko",
        country: "Japan",
        quantity: 3,
        price_offered: 5,
    },
    {
        username: "natsuiii",
        img: "https://static.mothership.sg/1/2020/05/1GM01205_724-1.jpg",
        description: "Fila x Subway shoes Size:38",
        country: "Korea",
        quantity: 1,
        price_offered: 150,
    },
    {
        username: "Abeybaby",
        img: "https://www.ubuy.vn/productimg/?image=aHR0cHM6Ly9pLmViYXlpbWcuY29tL2ltYWdlcy9nL1JuRUFBT1N3OHcxWUEweTgvcy1sNTAwLmpwZw.jpg",
        description: "Lach Gummi Softies",
        country: "Germany",
        quantity: 4,
        price_offered: 7.5,
    },
    {
        username: "Sykkunno",
        img: "https://cw.lnwfile.com/_/cw/_raw/cj/zg/uv.jpg",
        description: "I'm Real Mango",
        country: "Thailand",
        quantity: 10,
        price_offered: 12,
    },
    {
        username: "xingQitian",
        img: "https://ae01.alicdn.com/kf/HTB15fAJHVXXXXcjXFXXq6xXFXXXd/Chinese-specialty-snacks-TONGYI-noodles-travel-portable-Spicy-food-Chinese-special-food-delicious-noodles-4bag-lot.jpg_Q90.jpg_.webp",
        description: "Beef Instant noodles",
        country: "China",
        quantity: 6,
        price_offered: 9,
    },
    {
        username: "xXchipyyXx",
        img: "https://i.pinimg.com/736x/2d/ea/ee/2deaeeced60e0c028417433b75df5a6c.jpg",
        description: "Honey Butter Chips",
        country: "Korea",
        quantity: 2,
        price_offered: 3,
    },
    {
        username: "valky",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAGNEHaXu7noDPK39umGYOIVV8yTmheH6mLQ&usqp=CAU",
        description: "Koala Mango Cookies",
        country: "Hong Kong",
        quantity: 10,
        price_offered: 5.5,
    },
    {
        username: "fueslie",
        img: "http://cdn.shopify.com/s/files/1/0574/3129/4129/products/VitalisJoghurtMusli.jpg?v=1634489837",
        description: "Dr Oetker Joghurt Müsli",
        country: "Germany",
        quantity: 2,
        price_offered: 13.5,
    },
    {
        username: "BostonGal",
        img: "https://m.media-amazon.com/images/I/811hjolWF6L._SX425_.jpg",
        description: "Boston Red Sox 47 Fitted hat",
        country: "USA",
        quantity: 1,
        price_offered: 45,
    },
    {
        username: "PeterParker",
        img: "https://cdn-images.farfetch-contents.com/13/91/79/64/13917964_21714976_600.jpg",
        description: "Air Jordan 1 Mid SE lakers Size: 42",
        country: "USA",
        quantity: 1,
        price_offered: 1700,
    },
    {
        username: "Sydeon",
        img: "http://cdn.shopify.com/s/files/1/0585/0654/3312/products/05_Front_1080px_248_1024x.jpg?v=1639727607",
        description: "Offline tv Hoodie",
        country: "USA",
        quantity: 1,
        price_offered: 122,
    },
];

const connStr = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@generalassembly.nrg3u.mongodb.net/?retryWrites=true&w=majority`;

async function init() {
    const DB = await mongoose.connect(connStr, { dbName: "Buy4Me" });
    await itemRequested.insertMany(data);

    console.log("success!");

    process.exit();
}

init();
