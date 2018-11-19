const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = mongoose.model("Product");

router.get("/api/shopping-cart", (req, res) => {
	let panier = req.session.shopping_cart;
	if (!panier) {
		req.session.shopping_cart = [];	
	}
	res.status(200);
	res.send(req.session.shopping_cart);

	});

router.get("/api/shopping-cart/:productId", (req, res) => {

	let panier = req.session.shopping_cart;
	let produitDemande;
	let trouve = false;
	if (typeof(panier) == undefined) {
		res.sendStatus(404) ;	
	}
	panier.forEach(function(produit) {

		if (produit.id == productId) {
			produitDemande = produit ;
			trouve = true;
		}
	});
	if (trouve) {
		res.status(200).send(produitDemande);
	}
	else {
		res.sendStatus(404) ;
	}
});

router.post("/api/shopping-cart", (req, res) => {
	let panier = req.session.shopping_cart;
	let quantite = req.body.quantite;
	let productId = req.body.productId
	if (typeof(panier) == undefined) {
		panier = []
	}
	Product.findOne({"id" : req.body.productId}, function (err, produit){
		if (err || typeof(produit) == undefined || quantite < 1) {
			res.sendStatus(400);
		}
		else {
			panier.forEach(function(prod){
				if (prod.productId == productId) {
					res.sendStatus(400);
				}
			});
			panier.push({"productId" : productId, "quantity" : quantite});
			req.session.shopping_cart = panier;
			res.status(201);
		}
	});
});

router.put("/api/shopping-cart/:id", (req, res) => {

	let panier = req.session.shopping_cart;
	let quantite = res.body.quantite;
	let trouve = false;

	if (panier == undefined) {
		res.sendStatus(404);
	}
	if(quantite < 1){
		res.sendStatus(400);
	}
	panier.forEach(function(produit) {
		if (produit.productId == id){
			trouve = true;
			produit.quantite = quantite;
		}
	});
	if (trouve) {
		req.session.shopping_cart = panier;	
		res.sendStatus(204);
	}
	else {
		res.sendStatus(404);
	}
});

router.delete("/api/shopping-cart", (req, res) => {

	let panier = req.session.shopping_cart;
	let trouve = false;
	let indice;
	for (let i = 0; i < panier.length; i++){

		if (panier[i].productId == id){
			trouve = true;
			indice = i;
		}

	}
	if (trouve) {
		panier.splice(indice, 1);
		res.sendStatus(204);
	}
	else {
		res.sendStatus(404);
	}
});


router.delete("/api/shopping-cart", (req, res) => {
	req.session.shopping_cart = [];
	res.sendStatus(204);

});

module.exports = router;