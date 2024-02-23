const router = require("express").Router();
const {makePayment,bookShow} = require("../controller/bookingController")

router.route("/make-payment").post(makePayment);

router.route("/book-show").post(bookShow);

module.exports = router