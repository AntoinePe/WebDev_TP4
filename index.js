const express = require("express");
const router = express.Router();

/*const products= require('./produits');
const panier=require('./panierAchat');
const commande=require('./commande');

router.use('/api/products/*',products);
router.use('/api/shopping-cart/*',panier);
router.use('/api/orders/*',commande)
*/

var nbItem=5;
var menuActif="";
var firstNameOrder=""
var nameOrder=""

router.get("/", (req, res) => {
	menuActif="Accueil";
  	res.render("index", { 
  							title: "Accueil", 
  							count: nbItem,
  							message: "Le site n°1 pour les achats en ligne !",
  							description: "Découvrez nos différents produits au meilleur prix.",
  						});
});

router.get("/accueil", (req,res) => {
	menuActif="Accueil";
	res.render("index", { 
							title:"Accueil", 
							count: nbItem,
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
							title:"Contact",
							count:nbItem
	});

});

router.get("/produits", (req,res)=>{
	menuActif="Produits"
	res.render("produits", {
							title: "Produits",
							titre: "Produits",
							count: nbItem
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
/*router.get("/produit/:id", (req,res)=>{});





*/

module.exports = router;
