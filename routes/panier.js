const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = mongoose.model("Product");

router.get("/api/shopping-cart", (req, res) => {
	if (!req.session.shopping_cart){
		req.session.shopping_cart = [];	
	}
	res.status(200);
	res.send(req.session.shopping_cart);
});

router.get("/api/shopping-cart/:productId", (req, res) => {
	if (!req.session.shopping_cart) {
		res.sendStatus(404) ;	
	}
	req.session.shopping_cart.forEach(function(produit) {
		if (produit.id == req.params.productId) {
			res.status(200);
			res.send(produit);
		}
	});
	res.sendStatus(404);
});

router.post("/api/shopping-cart", (req, res) => {
	let panier = req.session.shopping_cart;
	let quantite = req.body.quantity;
	let productId = req.body.productId;
	if (!req.session.shopping_cart) {
		req.session.shopping_cart=[];
	}
	Product.findOne({"id" : req.body.productId}, function (err, produit){
		//Si l'identifiant spécifié n'existe pas ou si la quantite est invalide, on renvoie un code 400
		if (err || typeof(produit) == undefined || quantite < 1) {
			res.sendStatus(400);
		}
		else {
			req.session.shopping_cart.forEach(function(prod){
				if (prod.productId == productId) {
					//Si le produit a deja été ajouté au panier, on renvoie aussi un code 400
					res.sendStatus(400);
				}
			});
			req.session.shopping_cart.push({"productId": productId, "quantity": quantite});
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