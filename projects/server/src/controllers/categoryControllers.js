const db = require("../models");
const category = db.Category;
const upload = require("../middleware/multer");

module.exports = {
  createNewCategory: async (req, res) => {
    try {
      upload(req, res, async (err) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            message: "Error uploading image",
          });
        }
        const { category_name } = req.body;

        if (!category_name) {
          return res.status(400).send("Please provide a category name");
        }
        if (!req.file) {
          return res.status(400).send("No file uploaded");
        }

        let imageUrl = req.protocol + "://" + req.get("host") + "/categories/" + req.file.filename;

        const newCategory = await category.create({
          category_name: category_name,
          category_image: imageUrl,
        });

        res.status(200).send({
          status: true,
          message: "Successfully create new category",
          data: newCategory,
        });
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        status: false,
        message: "Error creating category",
      });
    }
  },
  fetchAllCategories: async (req, res) => {
    try {
      let result = await category.findAll({});

      res.status(200).send({
        status: true,
        message: "Successfully fetch all categories",
        data: result,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
