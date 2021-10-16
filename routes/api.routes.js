const { authJwt } = require("../middlewares");
const profileController = require("../controllers/profile.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/profile/changePassword", [authJwt.verifyToken], profileController.changePassword);

    app.post("/api/profile/uploadProfilePhoto", [authJwt.verifyToken], profileController.uploadProfilePhoto);

    app.post("/api/profile/updateProfile", [authJwt.verifyToken], profileController.updateProfile);

    app.get("/api/profile/getProfile", [authJwt.verifyToken], profileController.getProfile);

    // app.get("/api/test/all", controller.allAccess);

    // app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

    // app.get(
    //     "/api/test/mod",
    //     [authJwt.verifyToken, authJwt.isModerator],
    //     controller.moderatorBoard
    // );

    // app.get(
    //     "/api/test/admin",
    //     [authJwt.verifyToken, authJwt.isAdmin],
    //     controller.adminBoard
    // );
};