const router = require("express").Router();
const{getAllTheatres,addTheatre,getTheatreById,updateTheatre,deleteTheatre} = require("../controller/theatreController")

router.route("/getAllTheatres").get(getAllTheatres);
router.route("/getTheatreById/:id").get(getTheatreById)

router.route("/addTheatre").post(addTheatre);

router.route("/updateTheatre").put(updateTheatre);
router.route("/deleteTheatre").delete(deleteTheatre);



module.exports = router