const jwt = require("jsonwebtoken");
const express = require("express");
const User = require("../db/userModel");
const router = express.Router();
//Đăng kí
router.post('/register',async(req,res)=>{
  try{
    const {login_name,password,first_name,last_name,location,description,occupation}=req.body;
    const user=await User.findOne({login_name})
    if(user){
      res.status(400).json({message:"Tên đăng nhập đã tồn tại"})
    }
    else{
      await User.create({login_name,password,first_name,last_name,location,description,occupation})
      res.json({status:'OK',message:"Đăng kí thành công"})
    }

  }
  catch(error){
    res.status(500).json({message:"Lỗi khi đăng kí",error:error.message})
  }
})
// Đăng nhập
router.post('/login', async (req, res) => {
  try {
    const { login_name, password } = req.body;
    const user = await User.findOne({ login_name, password });

    if (user) {
      res.json({ status: 'OK', message: "Đăng nhập thành công", data: user });
    } else {
      res.status(401).json({ message: "Tên đăng nhập hoặc mật khẩu sai" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi đăng nhập", error: error.message });
  }
});

// Lấy danh sách tất cả người dùng
router.get("/getall", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách người dùng", error: error.message });
  }
});

// Lấy chi tiết người dùng theo ID
router.get("/getdetail/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy thông tin người dùng", error: error.message });
  }
});

module.exports = router;
