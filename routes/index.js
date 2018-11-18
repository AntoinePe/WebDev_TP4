const express = require("express");
const router = express.Router();


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
	res.render("produits", {
							title: "Produits",
							titre: "Produits"
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
