const router = require("express").Router();
const {validateUser} = require("../controller/loginController")


router.route("/")
       .post(validateUser)


module.exports = router