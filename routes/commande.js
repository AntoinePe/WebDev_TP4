const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = mongoose.model("Order");
const Product = mongoose.model("Product");

router.get("/api/orders", (req, res) => {

	var Envoyer = function(err, orderList){
		if(err){
			console.log(err);
			res.send(err);
			return;
		}
		res.send(orderList);
		res.status(200);
	}
	Order.find({}, '-_id', Envoyer);

});

router.get("/api/orders/:id", (req, res) => {
	var EnvoyerOrder = function(err, order) {
		if(err){
			res.send(404);
		}
		if (!order){
			//Si la commande n'existe pas, on renvoie un code 404
			res.sendStatus(404);
		}
		else{
			res.status(200)
			res.send(order);
		}
	}
	Order.findOne({"id" : req.params.id}, EnvoyerOrder);
});



router.post("/api/orders", (req, res) => {
	let isValid=true;

	let phonePatern =  /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/g;
	let emailPatern = /^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$/;

	if (req.body.firstName == "" || req.body.lastName == "") {
		isValid=false;
	}

	else if (!phonePatern.test(req.body.phone)) {
		isValid=false;
	}

	else if (!phonePatern.test(req.body.email)) {
		isValid=false;
	}
	//Si l'identifiant de la commande n'est pas un nombre, renvoyé un coe 400
	else if (typeof(req.body.id)!=Number){
		isValid=false;
	}

	Order.findOne({"id" : req.body.id}, function(err, order){
		if (order){
			isValid=false;
			return;
		}
	});

	req.body.products.forEach(function(product){
		if(typeof(product.id) != Number || typeof(product.quantity) != Number){
			isValid=false;
		}else if(product.quantity <= 0){
			isValid=false;
		}else{
		Product.findOne({"id": product.id},function(err,produit){
			if(err)
				throw err;
			if(!produit){
				isValid=false;
				return;
			}
		})
		}
	});
	if(isValid){
		let order = new Order({  
			id: req.body.id,
			firstName: req.body.order.firstName,
			lastName: req.body.order.lastName,
			email: req.body.order.email,
			phone: req.body.order.phone,
			products: req.body.order.products});
		order.save(function(err) {
			if (err) throw err;
		});
		res.sendStatus(201);
	}else{
		res.sendStatus(400);
	}
});

router.delete("/api/orders/:id", (req, res) => {

	Order.findOne({"id" : req.params.id}, function(err, order) {
		if (!order) {
			res.sendStatus(404);
		}
		else{
			Order.remove({"id": order.id},function(err){
				if(err)
					throw err;
			});
		res.sendStatus(204);
		}
	});
});

router.delete("/api/orders", (req, res) => {
	Order.remove({}, function(err) {
		if(err) {
			throw err;
		}
		else {
			res.sendStatus(204);	
		}
	});	
});

module.exports = router;