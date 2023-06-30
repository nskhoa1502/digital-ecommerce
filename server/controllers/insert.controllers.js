const Product = require("../models/product.model");
const Brand = require("../models/brand.model");
const data = require("../data/ecommerce.json");
const slugify = require("slugify");
const ProductCategory = require("../models/productCategory.model");
const productCategoryData = require("../data/cate_brand");

const fn = async (product) => {
  await Product.create({
    title: product?.name,
    slug: slugify(product?.name) + Math.round(Math.random() * 10000) + "",
    description: product?.description,
    brand: product?.brand,
    price: Math.round(Number(product?.price.match(/\d/g).join("") / 100)),
    category: product?.category[1],
    quantity: Math.round(Math.random() * 1000),
    sold: Math.round(Math.random() * 100),
    images: product?.images,
    color: product?.varients?.find((el) => el.label === "Color")?.variants[0],
  });
};

const insertProduct = async (req, res, next) => {
  try {
    const promises = [];
    for (let product of data) promises.push(fn(product));
    await Promise.all(promises);
    return res.json("done");
  } catch (error) {
    next(error);
  }
};

const fn2 = async (categoryData) => {
  await ProductCategory.create({
    title: categoryData?.category,
    brand: categoryData?.brand,
  });
};

const insertProductCategory = async (req, res, next) => {
  try {
    const promises = [];
    for (let category of productCategoryData) promises.push(fn2(category));
    await Promise.all(promises);
    return res.json("done");
  } catch (error) {
    next(error);
  }
};

module.exports = { insertProduct, insertProductCategory };
