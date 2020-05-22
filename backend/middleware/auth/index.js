const admin = require("./firebaseAdmin");

module.exports = (req, res, next) => {
  const authtoken = req.headers["authorization"];
  console.log(authtoken);
  // exit(1);
  if (authtoken) {
    admin
      .auth()
      .verifyIdToken(authtoken)
      .then((decodeToken) => {
        // console.log("ye uid he", decodeToken);
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
