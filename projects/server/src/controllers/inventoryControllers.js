const db = require("../models");
const inventory = db.Inventory;
const inventoryHistory = db.Inventory_History;
const product = db.Product;
const discount = db.Discount;
const category = db.Category;
const { Op } = require("sequelize");
const { literal } = require('sequelize');

module.exports = {
  addInventory: async (req, res) => {
    try {
      const { id_product, id_branch, stock } = req.body;

      if (!id_product || !id_branch || !stock) {
        return res.status(400).send({
          isError: true,
          message: "Please complete your data",
        });
      }

      const newInventory = await inventory.create(req.body);

      res.status(200).send({
        isError: false,
        message: "Successfully add a product to store branch",
        data: newInventory,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send({
        isError: true,
        message: "Error adding a product to store branch",
      });
    }
  },
  fetchAllInventories: async (req, res) => {
    try {
    const branchId = req.query.branchId;
    const page = parseInt(req.query.page) || 1;
    const pageSize = 12;

    const category_id = parseInt(req.query.category) || null;
    const productName = req.query.name || null;
    const sort = req.query.sort || "ASC";
    const order = req.query.order === "product_price" ? 'discounted_price' : "`Product.product_name`";
    const admin = req.query.adm || null;

    const categoryQuery = category_id ? { id_category: category_id } : {};
    const productQuery = productName ? { product_name: { [Op.like]: `%${productName}%` } } : {};
    const stockQuery = !admin ? {stock: { [Op.gte]: 1} } : {};

    const allInventories = await inventory.findAndCountAll({
      where: {
        id_branch: branchId,
        ...stockQuery
      },
      include: [
        {
          model: product,
          where: { ...categoryQuery, ...productQuery },
          include: { model: category, attributes: ['category_name'] },
        },
        {
          model: discount,
          where: {
            end_date: {
              [Op.gte]: new Date(),
            },
          },
          required: false,
        },
      ],
      attributes: {
        include: [
          [
            literal("`Product`.`product_price` -  IFNULL((select case when d.discount_type =  'percentage' then `Product`.`product_price` *  d.discount_value * 0.01 when d.discount_type =  'amount' then  d.discount_value when d.discount_type = 'buy one get one' then 0 end as discount from discounts d where d.id_inventory = `Inventory`.`id` and end_date >= CURDATE() limit 1),0)"),
            'discounted_price',
          ],
        ],
      },
      order: [[literal(order), sort]],
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    res.status(200).send({
      isError: false,
      message: "Successfully fetch inventories",
      data: allInventories.rows,
      count: allInventories.count,
    });

    } catch (err) {
      console.log(err);
      res.status(400).send({
        isError: true,
        message: "Fetch inventories failed",
      });
    }
  },
  findInventory: async (req, res) => {
    const branchId = req.query.branchId
    const inventoryId = req.params.idInventory;
    try {
        let findInventory = await inventory.findOne({ where: { id: inventoryId } });
        if (!findInventory){
          return res.status(404).send({ isError: true, message: "Inventory not exist", navigate: true });
        }else if(findInventory.id_branch!=branchId){
          return res.status(404).send({ isError: true, message: "Id branch not valid", navigate: true });
        }
    
        res.status(200).send({
            status: "Successfully find inventory",
            data: findInventory,
            navigate: false
        });

    } catch (error) {
        console.log(error);
        res.status(404).send({isError: true, message: "Find inventory failed"})
    }
  },
  getInventoryById: async (req, res) => {
    const id = req.params.id;
    try {
      const inventoryData = await inventory.findOne({
        where: {
          id: id,
          stock: {
            [Op.gte]: 1,
          }
        },
        include: [{
          model: product
        },
        {
          model: discount,
          where: {
            end_date: {
              [Op.gte]: new Date(),
            }
          },
          required: false,
        }
      ],
      attributes: {
        include: [
          [
            literal("`Product`.`product_price` -  IFNULL((select case when d.discount_type =  'percentage' then `Product`.`product_price` *  d.discount_value * 0.01 when d.discount_type =  'amount' then  d.discount_value when d.discount_type = 'buy one get one' then 0 end as discount from discounts d where d.id_inventory = `Inventory`.`id` and end_date >= CURDATE() limit 1),0)"),
            'discounted_price',
          ],
        ],
      },
      })

      if (!inventoryData) {
        return res.status(404).send({ isError: true, message: "Inventory not exist", navigate: true})
      }
    
      res.status(200).send({
        isError: false,
        message: "Successfully fetch inventory by id",
        data: inventoryData,
      });

    } catch (error) {
      console.log(error);
      res.status(404).send({isError: true, message: "Fetch inventory by Id failed"})
    }
  },
  updateStock: async (req, res) => {
    const id = req.params.id;
    try {
      const {stock} = req.body;
      console.log(stock)

      const inventoryData = await inventory.findOne({
        where: {id : id}
      })

      if (!inventoryData) {
        return res.status(404).send({ isError: true, message: "Inventory not exist", navigate: true})
      }

      const data = await inventory.update({
        stock: stock
      },{
        where: {id: id},
      })
      
      let status = inventoryData.stock < stock ? "in" : "out";
      let qty = Math.abs(inventoryData.stock - stock);

      const result = await inventoryHistory.create({
        status: status,
        reference: 'manual',
        quantity: qty,
        id_inventory: id,
      })

      res.status(200).send({
        isError: false,
        message: "Successfully update stock",
        stock: stock,
        inventoryData: inventoryData,
        inventory: data,
        inventoryHistory: result
      });

    } catch (error) {
      console.log(error);
      res.status(404).send({isError: true, message: "Update stock failed"})
    }
  }
};
