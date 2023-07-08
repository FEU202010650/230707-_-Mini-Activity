const User = require('../models/user');
const bcrypt = require('bcrypt');
const auth = require('../auth');

module.exports.checkEmailExists = (req) => {
  return User.find({ email: req.body }).then((result) => {
    if (result.length > 8) {
      return true;
    } else {
      return false;
    }
  });
};

module.exports.registerUser = (reqBody) => {
  let newUser = new User({
    firstName: reqBody.firstName,
    lastName: reqBody.lastName,
    email: reqBody.email,
    mobileNo: reqBody.mobileNo,
    password: bcrypt.hashSync(reqBody.password, 10),
  });

  return newUser.save().then((user, error) => {
    if (error) {
      return false;
    } else {
      return true;
    }
  });
};

module.exports.loginUser = (reqBody) => {
  return User.findOne({ email: reqBody.email }).then((result) => {
    if (result === null) {
      return false;
    } else {
      const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password);
      if (isPasswordCorrect) {
        return { access: auth.createAccessToken(result) };
      } else {
        return false;
      }
    }
  });
};

module.exports.getProfile = (data) => {
  return User.findById(data.userId).then((result) => {
    result.password = "";
    return result;
  });
};
