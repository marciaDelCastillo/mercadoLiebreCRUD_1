const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const finalPrice = require("../utils/finalPrice");

const controller = {
	index: (req, res) => {
		res.render("index", {
			products, 
			productsInSale: products.filter(producto=>producto.category==="in-sale"),
			productsVisited: products.filter(producto=>producto.category==="visited"),
			finalPrice}
			);
	},
	search: (req, res) => {
		res.render("results", {
			filtrados: products.filter(producto=>producto.name.toLowerCase().includes(req.query.keywords.toLowerCase().trim())),
			busqueda: req.query.keywords.trim(),
			finalPrice
		})
	},
};

module.exports = controller;
