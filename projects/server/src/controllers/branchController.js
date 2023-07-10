const db = require("../models");
const branch = db.Store_Branch;

module.exports = {
  getBranch: async (req, res) => {
    try {
      const branchData = await branch.findAll();
      if (!branchData) {
        return res
          .status(400)
          .send({ code: 400, message: `Cant't get branch data` });
      }
      res
        .status(200)
        .send({
          code: 200,
          message: "Get branch data success",
          data: branchData,
        });
    } catch (error) {
      console.log(error);
      res
        .status(404)
        .send({ isError: true, message: "Get branch data failed" });
    }
  },

  getBranchDetail: async (req, res) => {
    try {
      const branchData = await branch.findOne({ where: { id: req.params.id } });
      if (!branchData) {
        return res
          .status(400)
          .send({ code: 400, message: `Can't get branch detail` });
      }
      res
        .status(200)
        .send({
          code: 200,
          message: "Get branch detail success",
          data: branchData,
        });
    } catch (error) {
      console.log(error);
      res
        .status(404)
        .send({ isError: true, message: "Get branch detail failed" });
    }
  },
  createBranch: async (req, res) => {
    try {
      let { branch_name, address, city, province } = req.body;
      if (!branch_name || !address || !city || !province)
        return res
          .status(404)
          .send({
            isError: true,
            message: "Please fill all the required fields",
          });

      const [cityId, cityName] = city.split("-");
      const [provinceId, provinceName] = province.split("-");

      const result = await branch.create({
        branch_name: branch_name,
        address: address,
        city: cityName,
        province: provinceName,
        city_id: cityId,
        province_id: provinceId,
        latitude: 110,
        longitude: 15
      });
      res
        .status(201)
        .send({
          isError: false,
          message: "New store branch has been created successfully",
          data: result,
        });
    } catch (error) {
      console.log(error);
      res
        .status(404)
        .send({ isError: true, message: "Failed to create store branch" });
    }
  },
  editBranch: async (req, res) => {
    try {
        let { branch_name, address, city, province } = req.body;
        const { id } = req.params;
        if (!branch_name || !address || !city || !province)
          return res
            .status(404)
            .send({
              isError: true,
              message: "Please fill all the required fields",
            });
  
        const [cityId, cityName] = city.split("-");
        const [provinceId, provinceName] = province.split("-");
  
        const result = await branch.update({
          branch_name: branch_name,
          address: address,
          city: cityName,
          province: provinceName,
          city_id: cityId,
          province_id: provinceId,
          latitude: 110,
          longitude: 15
        }, { where: { id: id } });
        res
          .status(201)
          .send({
            isError: false,
            message: "Store branch has been edited successfully",
            data: result,
          });
      } catch (error) {
        console.log(error);
        res
          .status(404)
          .send({ isError: true, message: "Failed to store branch" });
      }
  },
  deleteBranch: async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id, 'this is id');
      let resultBranch = await branch.findOne({ where: { id: id } });
      if (!resultBranch) {
        return res.status(404).send({ isError: true, message: "branch not found" });
      }
      const result = await branch.destroy({ where: { id: id } });
      res.status(202) .send({ message: `Success delete branch data with id = ${id}`, data: result, });
    } catch (error) {
      res.status(400).send({ message: "Error while request delete" });
    }
  }
};
