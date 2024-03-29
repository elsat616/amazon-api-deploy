const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: true }));

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    mesage: "Success !",
  });
});

app.post("/payment/create", async (req, res) => {
  try{
    const total = req.query.total;
    if (total > 0) {
      //    console.log("payment recived", total)
      //    res.send(total)
  
      const paymentIntent = await stripe.paymentIntents.create({
        amount: parseInt(total),
        currency: "usd",
      });
      // console.log(paymentIntent)
  
      res.status(201).json({
        clientSecret: paymentIntent.client_secret,
      });
    } else {
      res.status(403).json({ message: "Payment must be greater than zero" });
    }
  } catch(error){
    res.status(500).json({ message: "server error please try again" });
  }
  
});

app.listen(2024,(err) =>{
  if(err) throw err;
  console.log("Amazon Server running on port:2024, http://localhost:2024")
})
