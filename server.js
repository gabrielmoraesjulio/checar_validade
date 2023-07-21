const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const moment = require("moment")
require("dotenv").config()
require("./models/Product")

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("assets"))

const Product = require("./models/Product")

app.get("/", async (req, res) => {
    const allProducts = await Product.findAll()
    const overdueDay = {
        0: moment().subtract(1, 'days').format("YYYY-MM-DD"),
        1: moment().subtract(2, 'days').format("YYYY-MM-DD"),
        2: moment().subtract(3, 'days').format("YYYY-MM-DD"),
        3: moment().subtract(4, 'days').format("YYYY-MM-DD"),
        4: moment().subtract(5, 'days').format("YYYY-MM-DD"),
        5: moment().subtract(6, 'days').format("YYYY-MM-DD"),
        6: moment().subtract(7, 'days').format("YYYY-MM-DD"),
    }

    const overdue1 =  await Product.findAll({ where: {validity: overdueDay[0]} })
    const overdue2 =  await Product.findAll({where: {validity: overdueDay[1]} })
    const overdue3 =  await Product.findAll({where: {validity: overdueDay[2]} })
    const overdue4 =  await Product.findAll({where: {validity: overdueDay[3]} })
    const overdue5 =  await Product.findAll({where: {validity: overdueDay[4]} })
    const overdue6 =  await Product.findAll({where: {validity: overdueDay[5]} })
    const overdue7 =  await Product.findAll({where: {validity: overdueDay[6]} })

    const validityDay = {
        0: moment().add(1, 'days').format("YYYY-MM-DD"),
        1: moment().add(2, 'days').format("YYYY-MM-DD"),
        2: moment().add(3, 'days').format("YYYY-MM-DD"),
        3: moment().add(4, 'days').format("YYYY-MM-DD"),
        4: moment().add(5, 'days').format("YYYY-MM-DD"),
        5: moment().add(6, 'days').format("YYYY-MM-DD"),
        6: moment().add(7, 'days').format("YYYY-MM-DD"),
    }

    const validity1 =  await Product.findAll({ where: {validity: validityDay[0]} })
    const validity2 =  await Product.findAll({where: {validity: validityDay[1]} })
    const validity3 =  await Product.findAll({where: {validity: validityDay[2]} })
    const validity4 =  await Product.findAll({where: {validity: validityDay[3]} })
    const validity5 =  await Product.findAll({where: {validity: validityDay[4]} })
    const validity6 =  await Product.findAll({where: {validity: validityDay[5]} })
    const validity7 =  await Product.findAll({where: {validity: validityDay[6]} })

    res.render("index", {
        select1: validity1,
        select2: validity2,
        select3: validity3,
        select4: validity4,
        select5: validity5,
        select6: validity6,
        select7: validity7,
        ///////////////////
        overSelect1: overdue1,
        overSelect2: overdue2,
        overSelect3: overdue3,
        overSelect4: overdue4,
        overSelect5: overdue5,
        overSelect6: overdue6,
        overSelect7: overdue7,
        ///////////////////
        products: allProducts
    })
})

app.post("/create", async (req, res) => {

    await Product.create({
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

app.post("/delete", async (req, res) => {
    await Product.destroy({
        where: {id: req.body.idDeletar}
    })
    res.redirect("/")
})

const port = process.env.PORT
app.listen(port, console.log(`Server running in http://localhost:${port}`))