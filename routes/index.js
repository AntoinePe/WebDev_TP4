const express = require("express");
const router = express.Router();

var nbItem=5;
var menuActif="";
var firstNameOrder=""
var nameOrder=""

router.get("/", (req, res) => {
	menuActif="Acceuil";
  	res.render("index", { 
  							title: "Accueil", 
  							count: nbItem,
  							message: "Le site n°1 pour les achats en ligne !",
  							description: "Découvrez nos différents produits au meilleur prix.",
  						})
});

router.get("/acceuil", (req,res) => {
	menuActif="Acceuil";
	res.render("index", { 
							title:"Acceuil", 
							count: nbItem,
							message: "Le site n°1 pour les achats en ligne !",
							description: "Découvrez nos différents produits au meilleur prix.",
							selected: "Acceuil"
						})
});

router.get("/confirmation", (req,res)=>{
	menuActif=""
	res.render('confirmation',{
								title:"Confirmation",
								confirmation:"Votre commande est confirmée "+firstNameOrder+" "+nameOrder+"!",
								numeroConf: "Votre numéro de confirmation est le <strong>00001</strong>."
	})
});


router.get("/contact", (req,res)=>{
	menuActif="Contact"
	res.render('contact',{
							title:"Contact",
							count:nbItem
	})

});
/*
router.get("/produits", (res,res)=>{
	res.render("produits", {
								title:
	})
});

router.get("/produit/:id", (res,res)=>{});

router.get("/panier", (res,res)=>{});

router.get("/commande", (res,res)=>{});

*/

module.exports = router;
