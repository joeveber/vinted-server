const express = require("express");
const router = express.Router();

const stripe = require("stripe")(process.env.API_SECRET_STRIPE);

router.post("/payment", async (req, res) => {
  try {
    // Réception du token créer via l'API Stripe depuis le Frontend
    const stripeToken = req.fields.stripeToken;
    // Etape 4 :Créer la transaction
    const response = await stripe.charges.create({
      amount: 2000,
      currency: "eur",
      description: "La description de l'objet acheté",
      // On envoie ici le token
      source: stripeToken,
    });
    console.log(response.status);
    //Etape 5 Envoyer le résultat au client
    res.json(response);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
