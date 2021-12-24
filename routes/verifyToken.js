const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    //jwt.verify will give us an err or the verified response in our case the user so we name it as user
    jwt.verify(token, "secret", (err, user) => {
      if (err) res.status(403).json("Token is not valid!");

      //like we have req.header and req.body similarly we are creating a req.user and storing this user value in it.

      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  //it will first run verify token bcoz of the function called "verifyToken" and it will there store value in req.user.id
  verifyToken(req, res, () => {
    console.log(req.user.id, req.params.id);
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
