const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  	res.render("index", { 
  							title: "Accueil", 
  							message: "Le site n°1 pour les achats en ligne !",
  							description: "Découvrez nos différents produits au meilleur prix."
  						})
});

router.get("/acceuil", (req,res) =>{
	res.render("index", { 
							title:"Acceuil", 
							message: "Le site n°1 pour les achats en ligne !",
							description: "Découvrez nos différents produits au meilleur prix."
						})
});

/*
router.get("/produits", (res,res)=>{
	res.render("produits", {
								title:
	})
});

router.get("/produit/:id", (res,res)=>{});

router.get("/contact", (res,res)=>{});

router.get("/panier", (res,res)=>{});

router.get("/commande", (res,res)=>{});

router.get("/confirmation", (res,res)=>{});
*/

module.exports = router;
