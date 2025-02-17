const { join } = require("path");
require('dotenv').config({ path: join(__dirname, '../.env') });
const key = process.env.SECRET_KEY

module.exports = (req, res, next) => {
    if (req.headers.secretkey == key) {
        return next()
    }

    res.status(500).send("auth fail")
}
