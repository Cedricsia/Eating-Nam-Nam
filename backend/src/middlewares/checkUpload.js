const checkUpload = (req, res, next) => {
  if (!req.file) {
    res.status(400).send("Aucune photo na été sélectionné");
  } else {
    next();
  }
};

module.exports = checkUpload;
