const router = require("express").Router();
const {validateUser,validateAdmin,resetPassword} = require("../controller/loginController")


router.route("/")
       .post(validateUser)
router.route("/reset-password").post(resetPassword);
router.route("/admin").post(validateAdmin)


module.exports = router