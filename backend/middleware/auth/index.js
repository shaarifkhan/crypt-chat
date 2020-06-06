const admin = require("./firebaseAdmin");

module.exports = (req, res, next) => {
  const authtoken = req.headers["authorization"];
  if (authtoken) {
    admin
      .auth()
      .verifyIdToken(authtoken)
      .then((decodeToken) => {
        const body = {
          _id: decodeToken.uid,
          email: decodeToken.email,
        };
        req.currentUser = body;
        next();
      })
      .catch(() => {
        console.log("unauthorized");
        res.status(403).send("Unauthorized");
      });
  } else {
    console.log("unauthorized");

    res.status(403).send("Unauthorized");
  }
};
