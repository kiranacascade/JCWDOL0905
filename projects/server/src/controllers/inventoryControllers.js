const db = require("../models");
const inventory = db.Inventory;
const product = db.Product;
const { Op } = require("sequelize");

module.exports = {
  addInventory: async (req, res) => {
    // let token = req.headers.authorization;

    // if (!token) {
    //   return res.status(400).send("token unauthorized or expired");
    // }
    try {
      const { id_product, id_branch, stock } = req.body;

      if (!id_product || !id_branch || !stock) {
        return res.status(400).send({
          status: false,
          message: "Please complete your data",
        });
      }

      const newInventory = await inventory.create(req.body);

      res.status(200).send({
        status: true,
        message: "Successfully add a product to store branch",
        data: newInventory,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        status: false,
        message: "Error adding a product to store branch",
      });
    }
  },
  fetchAllInventories: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = 12;

      const category_id = parseInt(req.query.category) || null;
      const productName = req.query.name || null;

      const categoryQuery = category_id ? { id_category: category_id } : {};
      const productQuery = productName ? { product_name: { [Op.like]: `%${productName}%` } } : {};

      const allInventories = await inventory.findAndCountAll({
        where: {
          id_branch: 1,
        },
        include: {
          model: product,
          where: { ...categoryQuery, ...productQuery },
        },
        order: [[{ model: product }, req.query.order, req.query.sort]],
        limit: pageSize,
        offset: (page - 1) * pageSize,
      });

      res.status(200).send({
        status: true,
        message: "Successfully retrieved all inventories",
        data: allInventories.rows,
        count: allInventories.count,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  fetchInventoryByCategory: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = 12;

      // const category_id = parseInt(req.query.category) || null;
      const productName = req.query.name || null;

      // const id = req.params.id;

      // const categoryQuery = category_id ? { id_category: category_id } : {};
      const productQuery = productName ? { product_name: { [Op.like]: `%${productName}%` } } : {};

      const inventoriesByCat = await inventory.findAndCountAll({
        where: {
          id_branch: 1,
          // id_branch: req.params.id,
        },
        include: {
          model: product,
          where: { id_category: req.params.id },
        },
        order: [[{ model: product }, req.query.order, req.query.sort]],
        limit: pageSize,
        offset: (page - 1) * pageSize,
      });

      res.status(200).send({
        status: true,
        message: "Successfully retrieved all inventories sort by category",
        data: inventoriesByCat.rows,
        count: inventoriesByCat.count,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
};
