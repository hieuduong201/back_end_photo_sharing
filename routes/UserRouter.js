const express = require("express");
const User = require("../db/userModel");
const router = express.Router();

router.post("/", async (request, response) => {

  
});

router.get("/", async (request, response) => {
    const users = await User.find({});
    response.json(users);
});
router.get("/:userId", async (request, response) => {
  const userId = request.params.userId;
  const user = await User.findById(userId);
  response.json(user);
});

module.exports = router;