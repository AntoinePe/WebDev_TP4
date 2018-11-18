const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");



router.get("/api/products", (req, res) => {
	var Product = mongoose.model("Product")
	let produits = [] ;
	let category = req.query.category;
	let criteria = req.query.criteria;

	if (category != "cameras" && category != "computers" && category != "consoles" && category != "screens")
		res.sendStatus(400);
	if (criteria != "alpha-asc" && criteria != "alpha-dsc" && criteria != "price-asc" && criteria != "price-dsc" && typeof(criteria) != undefined)
		res.sendStatus(400);

	Product.find({category : category}, function(err, product) {
  if (err) throw err;
  else {
  	produits.push(product);
  }
});
	let critere;
		switch (criteria){


			case "alpha-asc":
				critere = (a,b) => a["name"].localeCompare(b["name"]);
				break;
			case "alpha-dsc":
				critere = (a,b) => b["name"].localeCompare(a["name"]);
				break;
			case "price-asc":
				critere = (a,b) => a["price"] - b["price"];
				break;
			case "price-dsc":
				critere = (a,b) => a["price"] - b["price"];
				break;
			default:
				critere = (a,b) => b["name"].localeCompare(a["name"]);
		}

		produits.sort(critere);
		res.status(200).send(produits);

});

router.get("/api/products/:id", (req, res) => {

	let trouve = false;
	let produit;
	Product.find({id : id}, function(err, product) {
		if (typeof(product) != undefined) {
			trouve = true;
			produit = product;

		}
	});

	if (trouve) {

		res.status(200).send(produit);

	}
	else {

		res.sendStatus(404);
	}

});

router.post("api/products", (req, res) => {

	if (req.body.name == "" || req.body.price <= 0 || req.body.image == "" || description == "" )
		res.sendStatus(400);
	if (req.body.category != "cameras" && req.body.category != "computers" && req.body.category != "consoles" && req.body.category != "screens")
		res.sendStatus(400);

	req.body.features.forEach(function(feature){
		if (feature == "")
			res.sendStatus(400);
	})
Product.find({id : req.body.id}, function(err, product) {
	if (typeof(product) != undefined)
		res.sendStatus(400);
});

let produit = Product({
	id: req.body.id,
  name: req.body.name,
  price: req.body.price,
  image: req.body.image,
  category: req.body.category,
  description: req.body.description,
  features: req.body.features
});
produit.save(function(err) {
	if (err)
		throw err;
	res.sendStatus(201);
});






});

router.delete("api/products/:id", (req, res) => {

			Product.find({id : id}, function(err, product) {

			if (typeof(order) == undefined) {

				res.sendStatus(404);
			}

		product.remove(function(err) {}) ;

	});
	res.sendStatus(204);


});

router.delete("api/products", (req, res) => {

	Product.find({}, function(err, product) {

		product.remove(function(err) {}) ;

	});
	res.sendStatus(204);

});

module.exports=router;