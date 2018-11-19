const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");


var menuActif="";
var firstNameOrder=""
var nameOrder=""

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
	menuActif="Produits"
	prod = ""
	var Product = mongoose.model("Product");
	var trierEnvoyer = function(err, productList){
		if(err){
			console.log(err);
			//res.send(err);
			//return;
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
		prod = JSON.stringify(productList,null,2);
		//console.log(prod)
		//res.send(productList);
		//res.status(200);
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
			//res.sendStatus(400);
			return;
	}

	res.render("produits", {
							title: "Produits",
							titre: "Produits",
							data:prod
	});

});

router.get("/panier", (req,res)=>{
	menuActif="Panier"
	res.render("panier", {
		title: "Panier",
		titre: "Panier"
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
	menuActif="Produits"
	res.render("product", {
							title:"Produits"
	});
});

module.exports = router;
