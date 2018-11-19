const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

var Product = mongoose.model('Product');


router.get("/api/products", (req, res) => {
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
			case "invalid":
				res.status(400);
			default:
				critere = (a,b) => a["price"] - b["price"];
		}
		productList.sort(critere);
		res.send(productList);
				if(productList==[]){
			res.status(400)
		}
		else{
			res.status(200);
		}
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
	var exist = function(err,produit){
		if(err){
			res.status(500)
			res.send(err);
			return;
		}
		if(produit){
			res.send(produit);
		}
		else{
			res.sendStatus(404);
		}
	}
	Product.findOne({"id" : req.params.id}, '-_id', exist);

});

router.post("/api/products", (req, res) => {
	var isValid = true;
	if (req.body.name == "" || req.body.price <= 0 || typeof(req.body.price) != Number || req.body.image == "" || req.body.description == "" ){
		isValid=false
	}
	if (req.body.category != "cameras" && req.body.category != "computers" && req.body.category != "consoles" && req.body.category != "screens"){
		isValid=false;
	}

	req.body.features.forEach(function(feature){
		if (feature == ""){
			isValid=false;
		}

	});

	Product.findOne({"id" : req.body.id},"-_id", function(err, product) {
		if (product){
			isValid=false;
		}
	});

	if(isValid){
		let produit = new Product({
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
		});
		res.sendStatus(201);
	}else{
		res.sendStatus(400);
	}
});

router.delete("/api/products/:id", (req, res) => {
	Product.findOne({"id" : req.params.id}, function(err, product) {
		if (product == null) {
			res.sendStatus(404);
		}
		else{
			product.remove(function(err) {
				if(err){
					console.log("Erreur lors de la suppression d'un produit.");
				}
			});
			res.sendStatus(204);
		}
	});
	
});

router.delete("/api/products", (req, res) => {
/*
	Product.find({}, function(err, product) {
		if(product!=null){
			product.remove(function(err) {
				if(err){
					console.log("Erreur lors de la suppresion des produits.");
				}
			});
		};
	});
	res.sendStatus(204);
*/
	Product.remove({},function(err){
		if(err)
			throw err;
		if(!err)
			res.sendStatus(204)
	});
});

module.exports=router;