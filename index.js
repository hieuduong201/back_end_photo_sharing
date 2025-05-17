const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./db/dbConnect");
const UserRouter = require("./routes/UserRouter");
const PhotoRouter = require("./routes/PhotoRouter");
const models = require('./modelData/models');


dbConnect();

app.use(cors());
app.use(express.json());
app.use("/api/user", UserRouter);
app.use("/api/photo", PhotoRouter);

// app.get("/", (request, response) => {
//   response.send({ message: "Hello from photo-sharing app API!" });
// });
// app.get("/users", (req, res) => {
//   res.json(models.userListModel());
// });
// app.get("/user/:userId", (req, res) => {
//   const userId=req.params.userId;
//   res.json(models.userModel(userId));

// })
// app.get("/photos/:userId", (req, res) => {
//   const userId=req.params.userId;
//   res.json(models.photoOfUserModel(userId));
// });
app.listen(8081, () => {
  console.log(`✅App listening at http://localhost:8081`);
});
