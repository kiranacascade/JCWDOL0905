const db = require("../models");
const product = db.Product;
const upload = require("../middleware/multer");

module.exports = {
  addProduct: async (req, res) => {
    try {
      upload(req, res, async (err) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            message: "Error uploading image. Please complete your data",
          });
        }

        const { product_name, product_price, weight, product_description, id_category } = req.body;

        if (!product_name || !product_price || !weight || !product_description || !id_category) {
          return res.status(400).send({
            status: false,
            message: "Please complete your data",
          });
        }

        if (!req.file) {
          return res.status(400).send("No file uploaded");
        }

        let imageUrl = req.protocol + "://" + req.get("host") + "/products/" + req.file.filename;

        const newProduct = await product.create({
          product_name: product_name,
          product_price: product_price,
          weight: weight,
          product_description: product_description,
          product_image: imageUrl,
          id_category: id_category,
        });

        res.status(200).send({
          status: true,
          message: "Successfully add a product",
          data: newProduct,
        });
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        status: false,
        message: "Error adding a product",
      });
    }
  },
  fetchAllProducts: async (req, res) => {
    try {
      const allProducts = await product.findAll({});

      res.status(200).send({
        status: true,
        message: "Successfully retrieved all products",
        data: allProducts,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  fetchProductImage: async (req, res) => {
    try {
      const result = await product.findOne({
        where: {
          id: req.params.id,
        },
      });
      // console.log(result);
      res.status(200).send(result.product_image);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
