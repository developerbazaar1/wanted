const profileImageHelper = (fieldName) => async (req, res, next) => {
  let file = req.file;
  if (req.file === undefined) {
    next();
    return;
  }

  try {
  } catch (error) {}
};

module.exports = {
  profileImageHelper,
};
