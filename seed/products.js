const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Product = require("../models/Product");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const products = [
  {
    name:"Glow Facial Wash",
    category:"Face Wash",
    price:89000,
    stock:20,
    image:"https://images.unsplash.com/photo-1556228578-8c89e6adf883",
    description:"Gentle facial wash for daily use"
  },

  {
    name:"Brightening Serum",
    category:"Serum",
    price:149000,
    stock:12,
    image:"https://images.unsplash.com/photo-1620916566398-39f1143ab7be",
    description:"Niacinamide serum for glowing skin"
  },

  {
    name:"Hydra Moisturizer",
    category:"Moisturizer",
    price:129000,
    stock:15,
    image:"https://images.unsplash.com/photo-1612817159949-195b6eb9e31a",
    description:"Hydrating moisturizer"
  },

  {
    name:"Daily Sunscreen SPF50",
    category:"Sunscreen",
    price:119000,
    stock:18,
    image:"https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    description:"Lightweight sunscreen"
  },

  {
    name:"Acne Repair Serum",
    category:"Serum",
    price:159000,
    stock:10,
    image:"https://images.unsplash.com/photo-1571781926291-c477ebfd024b",
    description:"Acne care serum"
  }
];

async function seedData() {

  await Product.deleteMany();

  await Product.insertMany(products);

  console.log("Products seeded");

  process.exit();
}

seedData();
