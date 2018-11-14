const express = require("express");
const router = express.Router();

var nbItem=0;
var firstNameOrder=""
var nameOrder=""

router.get("/", (req, res) => {
  	res.render("index", { 
  							title: "Accueil", 
  							count: nbItem,
  							message: "Le site n°1 pour les achats en ligne !",
  							description: "Découvrez nos différents produits au meilleur prix."
  						})
});

router.get("/acceuil", (req,res) => {
	res.render("index", { 
							title:"Acceuil", 
							count: nbItem,
							message: "Le site n°1 pour les achats en ligne !",
							description: "Découvrez nos différents produits au meilleur prix."
						})
});

router.get("/confirmation", (req,res)=>{
	res.render('confirmation',{
								title:"Confirmation",
								confirmation:"Votre commande est confirmée "+firstNameOrder+" "+nameOrder+"!",
								numeroConf: "Votre numéro de confirmation est le <strong>00001</strong>."
	})
});


router.get("/contact", (req,res)=>{
	res.render('contact',{
							title:"Contact",
							count:nbItem
	})

});


router.get("/produits", (req,res)=>{
	res.render("produits", {
								title:"Produits",
	})
});
/*

router.get("/produit/:id", (req,res)=>{});

router.get("/panier", (req,res)=>{});

router.get("/commande", (req,res)=>{});

*/

module.exports = router;
