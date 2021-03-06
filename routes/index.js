const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");


var menuActif="";
var firstNameOrder=""
var nameOrder=""
var listProduits
var produit

var getProduits = (criteria,categorie,res) =>{
	console.log("Recuperation de la liste des produits")
	var Product=mongoose.model("Product");

	var trierEnvoyer = function(err, productList){
		if(err){
			console.log(err);
			return;
		}
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
				critere = (a,b) => b["price"] - a["price"];
				break;
			default:
				res.status(400)
		}
		productList.sort(critere);
		listProduits=productList;
		res.render("produits", {
			title: "Produits",
			titre: "Produits",
			data: listProduits
		});
		return;
	}

	switch (categorie){
		case "cameras" :
		case "computers" :
		case "consoles" :
		case "screens" :
			Product.find({"category" : categorie}, '-_id', trierEnvoyer);
			break;
		case undefined:
			Product.find({}, '-_id', trierEnvoyer);
			break;		
		default:
			return;
	}
}

var getProduit = (id, res) => {

	console.log("Recuperation d'un produit");
	var Product=mongoose.model("Product");
	var Envoyer = (err, product) => {
		if(err){
			console.log(err);
			res.sendStatus(404);
		}
		else{		
			res.render("product", {

				title : "Produit",
				data : product

			});
			return;
		}
	}
	Product.findOne({"id" : id}, '-_id', Envoyer);
}

router.get("/", (req, res) => {
	menuActif="Accueil";
  	res.render("index", { 
  							title: "Accueil", 
  							message: "Le site n°1 pour les achats en ligne !",
  							description: "Découvrez nos différents produits au meilleur prix.",
  						});
});

router.get("/accueil", (req,res) => {
	menuActif="Accueil";
	res.render("index", { 
							title:"Accueil", 
							message: "Le site n°1 pour les achats en ligne !",
							description: "Découvrez nos différents produits au meilleur prix.",
							selected: "Accueil"
						});
});

router.get("/confirmation", (req,res)=>{
	menuActif=""
	res.render('confirmation',{
								title:"Confirmation",
								confirmation:"Votre commande est confirmée "+firstNameOrder+" "+nameOrder+"!",
								numeroConf: "Votre numéro de confirmation est le <strong>00001</strong>."
	});
});

router.get("/contact", (req,res)=>{
	menuActif="Contact"
	res.render('contact',{
							title:"Contact"
	});

});

router.get("/produits", (req,res)=>{
	getProduits("price-asc",undefined,res);
	/*
	res.render("produits", {
			title: "Produits",
			titre: "Produits",
			data: listProduits
		});*/
});

router.get("/panier", (req,res)=>{
	menuActif="Panier"
	if(req.session.shopping_cart==undefined){
		req.session.shopping_cart=[];
	} 
	res.render("panier", {
		title: "Panier",
		titre: "Panier",
		panier: req.session.shopping_cart
	});
});

router.get("/commande", (req,res)=>{
	menuActif="Commande"
	res.render("commande", {
		title: "Commande",
		titre: "Commande"

	});
});

router.get("/produits/:id", (req,res)=>{
	getProduit(req.params.id, res);	
});

module.exports = router;
