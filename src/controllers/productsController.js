const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render("products",{products})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let producto = products.find(producto=>producto.id===+req.params.id);
		res.render("detail", {producto});
	},

	// Create - Form to create
	create: (req, res) => {
		res.render("product-create-form");
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let producto = {
			id: products[products.length-1].id+1,
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			image: "default-image.png"
		}
		products.push(producto);
		fs.writeFileSync(path.join(__dirname,'../data/productsDataBase.json'), JSON.stringify(products, null, 2), "utf-8");
		res.redirect("/products");
	},

	// Update - Form to edit
	edit: (req, res) => {
		let producto = products.find(producto=> producto.id===+req.params.id);
		res.render("product-edit-form", {producto});
	},
	// Update - Method to update
	update: (req, res) => {
		for(let i=0;i<products.length;i++){
			if(products[i].id===+req.params.id){
				products[i].name = req.body.name,
				products[i].description = req.body.description,
				products[i].price = req.body.price,
				products[i].discount = req.body.discount,
				products[i].category = req.body.category
			}
		}
		fs.writeFileSync(path.join(__dirname,'../data/productsDataBase.json'), JSON.stringify(products, null, 2), "utf-8");
		res.redirect("/products");
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let index = 0;
		for(let i=0;i<products.length;i++){
			if(products[i].id===+req.params.id){
				index = i;
			}
		}
		products.splice(index,1);
		fs.writeFileSync(path.join(__dirname,'../data/productsDataBase.json'), JSON.stringify(products, null, 2), "utf-8");
		res.redirect("/products");
	}
};

module.exports = controller;