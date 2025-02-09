const express = require("express");
const { register, login, logout, getProfile, updateUser } = require("../controllers/User");
const checkAuth = require("../middlewares/checkAuth");
const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.get("/logout", logout)
router.get("/me", checkAuth, getProfile)
router.put("/update/:userId", checkAuth, updateUser)
module.exports = router;