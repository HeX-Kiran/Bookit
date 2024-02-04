const router = require("express").Router();

const{getAllShows,getShowByTheatreID,getShowsByMovieID,updateShow,deleteShow,addShow} = require("../controller/showController")

router.route("/getAllShows").get(getAllShows)
router.route("/getShowByTheatreId/:theatreID").get(getShowByTheatreID)
router.route("/getShowByMovieId").post(getShowsByMovieID)
router.route("/addShow").post(addShow)
router.route("/updateShow").put(updateShow);
router.route("/deleteShow").delete(deleteShow)

module.exports = router;