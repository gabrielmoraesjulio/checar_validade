const express = require("express")
const app = express()
const bodyParser = require("body-parser")
require("dotenv").config()
require("./models/Product")

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const Product = require("./models/Product")

app.get("/", async (req, res) => {
    const products = await Product.findAll()
    res.send(products)
})

app.post("/create", (req, res) => {

    Product.create({
        name: req.body.productName,
        weight: req.body.productWeight,
        validity: req.body.productValidity
    }).then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log(err)
    })

    res.redirect("/")
})

const port = process.env.PORT
app.listen(port, console.log(`Server running in http://localhost:${port}`))