const Sequelize = require("sequelize")
const db = require("../config/db")

const Product = db.define("product", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    weight: {
        type: Sequelize.STRING,
        allowNull: false
    },
    validity: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Product.sync().then(() => {}).catch((err) => {
    console.log(err)
})

module.exports = Product;