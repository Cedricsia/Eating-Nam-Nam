const CheckAdminExist = async (req, res, next) => {
  if (!req.user.role.includes("Admin")) {
    return res.sendStatus(403);
  }

  return next();
};

module.exports = CheckAdminExist;
