const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");



router.get("/api/products", (req, res) => {
	var Product = mongoose.model("Product");
	var trierEnvoyer = function(err, productList){
		if(err){
			console.log(err);
			res.send(err);
			return;
		}
		let critere;
		switch (req.query.criteria){
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
				critere = (a,b) => b["price"] - a["price"];
				break;
			default:
				critere = (a,b) => b["name"].localeCompare(a["name"]);
		}
		productList.sort(critere);
		res.send(productList);
		res.status(200);
	}

	switch (req.query.category){
		case "cameras" :
		case "computers" :
		case "consoles" :
		case "screens" :
			Product.find({"category" : req.query.category}, '-_id', trierEnvoyer);
			break;
		case undefined:
			Product.find({}, '-_id', trierEnvoyer);
			break;		
		default:
			res.sendStatus(400);
			return;
	}
});

router.get("/api/products/:id", (req, res) => {
	/*

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
	}*/
	console.log("Recuperation du produit".str(req.params.id))
	var Product=mongoose.model("Product");
	var exist = function(err,produit){
		if(err){
			console.log(err);
			res.send(err);
			return;
		}
		console.log(produit);
		if(produit){
			res.send(produit);
		}
		else{
			res.sendStatus(404);
		}
	}
	Product.findOne({"id" : req.params.id}, '-_id', exist);

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