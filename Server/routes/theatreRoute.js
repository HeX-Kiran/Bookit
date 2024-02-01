const router = require("express").Router();
const{getAllTheatres,addTheatre,getTheatreById,updateTheatre,deleteTheatre,checkIfUserHaveTheatre} = require("../controller/theatreController")

router.route("/getAllTheatres").get(getAllTheatres);
router.route("/getTheatreById/:id").get(getTheatreById)
router.route("/checkTheatre/:userID").get(checkIfUserHaveTheatre)

router.route("/addTheatre").post(addTheatre);

router.route("/updateTheatre").put(updateTheatre);
router.route("/deleteTheatre").post(deleteTheatre);




module.exports = router