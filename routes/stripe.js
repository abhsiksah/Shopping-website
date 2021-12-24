const router = require("express").Router();
const stripe = require("stripe")(
  "sk_test_51K5UqFSDyy8yJsj3MqxIYUi054zfXiFxqFHTFjaxUniQKtHFdYiEKJCZR4JRZocwEHLIKsO6geW4GGD3XRaCWBIX00tFBJERtD"
);

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
