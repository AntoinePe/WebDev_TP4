const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = mongoose.model("Order");

router.get("/api/order", (req, res) => {

	let orders = [] ;
	Order.find({}, function(err, order) {
		if (!err) {
		orders.append(order);
	}
	});

	res.status(200).send(orders);


});

router.get("/api/order/:id", (req, res) => {

	let trouve = false;
	let commandeDemandee;
	Order.find({id : id}, function(err, order){

		if (!(typeof(order) == undefined)){
			trouve = true;
			commandeDemandee = order;
		}

	});

	if (trouve) {

		res.status(200).send(commandeDemandee);
	}
	else {

		res.sendStatus(404);
	}

	
});

router.post("/api/order", (req, res) => {

	let phonePatern =  /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/g;
	let emailPatern = /^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$/;

	if (req.body.firstName == "" || req.body.lastName == "") {

		res.sendStatus(400);
	}

	else if (!phonePatern.test(req.body.phone)) {
		res.sendStatus(400);
	}

	else if (!phonePatern.test(req.body.email)) {
		res.sendStatus(400);
	}

	Order.find({id : req.body.id}, function(err, order){

		if (!(typeof(order) == undefined)){
			res.sendStatus(400);
		}

	});

	req.body.products.forEach(function(product){

		if (typeof(product.id) != Number || product.quantite <= 0) {
			res.sendStatus(400);
		}
	});

	let order = Order({  id: req.body.id,
  firstName: req.body.firstName,
  lastName: req.body.lastName,
  email: req.body.email,
  phone: req.body.phone,
  products: req.body.products});
  order.save(function(err) {

  	if (err) throw err;
  });
	
});

router.delete("/api/order/:id", (req, res) => {

		Order.find({id : id}, function(err, order) {

			if (typeof(order) == undefined) {

				res.sendStatus(404);
			}

		order.remove(function(err) {}) ;

	});
	res.sendStatus(204);



	
});

router.delete("/api/order", (req, res) => {

	Order.find({}, function(err, order) {

		order.remove(function(err) {}) ;

	});
	res.sensStatus(204);	
});

module.exports = router;