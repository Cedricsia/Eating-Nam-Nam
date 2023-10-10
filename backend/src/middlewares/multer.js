const multer = require("multer");

const path = require("node:path");
const { v4: uuidv4 } = require("uuid");

const mimeTypes = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (req.route.path.startsWith("/recipes")) {
      callback(null, path.join(__dirname, "../../public/uploads/recipes"));
    } else {
      callback(
        null,
        path.join(__dirname, "../../public/uploads/profilePicture")
      );
    }
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("-").split(".")[0];
    const ext = mimeTypes[file.mimetype];
    callback(null, `${name}-${uuidv4()}.${ext}`);
  },
});

module.exports = multer({ storage });
