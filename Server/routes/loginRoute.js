const router = require("express").Router();
const {validateUser,validateAdmin} = require("../controller/loginController")


router.route("/")
       .post(validateUser)
router.route("/admin").post(validateAdmin)


module.exports = router