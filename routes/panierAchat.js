const express = require("express");
const router = express.Router();
router.get("/api/shopping-cart", (req, res) => {
	let panier = req.session.shopping-cart;
	if (panier == undefined) {
		panier = [];	
	}
	res.status(200).send(panier);

	})

router.get("/api/shopping-cart/:productId", (req, res) => {

let panier = req.session.shopping-cart;
let produitDemande;
let trouve = false;
if (panier == undefined) {

	res.sendStatus(404) ;
}
panier.forEach(function(produit) {

	if (produit.id == productId) {
		produitDemande = produit ;
		trouve = true;

	}
})
if (trouve) {

	res.status(200).send(produitDemande);
}
else {
	res.sendStatus(404) ;
}
})

router.post("/api/shopping-cart", (req, res) => {

	


})

router.delete("/api/shopping-cart", (req, res) => {
req.session.shopping-cart = [];
res.sendStatus(204);

})