const router = require("express").Router();
const{getAllTheatres,addTheatre} = require("../controller/theatreController")

router.route("/getAllTheatres").get(getAllTheatres);

router.route("/addTheatre").post(addTheatre);



module.exports = router