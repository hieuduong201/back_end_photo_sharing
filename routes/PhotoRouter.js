const express = require("express");
const Photo = require("../db/photoModel");
const router = express.Router();

// Thêm bình luận vào ảnh
router.post("/comment/:photoId", async (req, res) => {
    try {
        const comment = req.body;
        const photoId = req.params.photoId;
        const photo = await Photo.findById(photoId);

        if (!photo) {
            return res.status(404).json({ message: "Ảnh không tồn tại" });
        }

        photo.comments.push(comment);
        await photo.save();
        res.json({ message: "Thêm bình luận thành công" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi thêm bình luận", error: error.message });
    }
});

// Xóa bình luận khỏi ảnh
router.post('/deletecomment/:photoId', async (req, res) => {
    try {
        const { commentId } = req.body;
        const photoId = req.params.photoId;
        const photo = await Photo.findById(photoId);

        if (!photo) {
            return res.status(404).json({ message: "Ảnh không tồn tại" });
        }

        photo.comments = photo.comments.filter(comment => comment._id != commentId);
        await photo.save();
        res.json({ message: "Xóa bình luận thành công" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi xóa bình luận", error: error.message });
    }
});

// Tạo mới một ảnh
router.post('/create', async (req, res) => {
    try {
        const {user_id,file_name}=req.body
        await Photo.create({user_id,file_name});
        res.json({ message: "Tải ảnh thành công" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi tải ảnh", error: error.message });
    }
});

// Lấy chi tiết một ảnh
router.get('/getdetail/:photoId', async (req, res) => {
    try {
        const photoId = req.params.photoId;
        const photo = await Photo.findById(photoId);

        if (!photo) {
            return res.status(404).json({ message: "Ảnh không tồn tại" });
        }

        res.json(photo);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy chi tiết ảnh", error: error.message });
    }
});

// Lấy tất cả ảnh của một user
router.get("/getall/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const photos = await Photo.find({ user_id: userId });
        res.json(photos);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách ảnh", error: error.message });
    }
});

module.exports = router;
