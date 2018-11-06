const express = require("express");
const router = express.Router();

const nbItem=5;
const menuActif="";
const firstNameOrder=""
const nameOrder=""

router.get("/", (req, res) => {
	menuActif="Acceuil"
	res.
  	res.render("index", { 
  							title: "Accueil", 
  							count: nbItem,
  							message: "Le site n°1 pour les achats en ligne !",
  							description: "Découvrez nos différents produits au meilleur prix.",
  						})
});

router.get("/acceuil", (req,res) => {
	menuActif="Acceuil"
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
								confirmation:"Votre commande est confirmée "+firstNameOrder+" "+nameOrder+"!",
								numeroConf: "Votre numéro de confirmation est le <strong>00001</strong>."
	})
});


router.get("/contact", (req,res)=>{
	menuActif="Contact"
	res.render('contact',{
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
