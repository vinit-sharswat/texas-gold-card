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

    /**
    * @swagger
    * /api/profile/changePassword:
    *    post:
    *     tags:
    *       - Profile Apis
    *     name: ChangePassword API
    *     summary: Changes password of a user
    *     security:
    *       - accessToken: []
    *     consumes:
    *       - application/json
    *     parameters:
    *       - name: body
    *         in: body
    *         schema:
    *           type: object
    *           properties:
    *             password:
    *               type: string
    *               format: password
    *         required:
    *           - password
    *     responses:
    *       200:
    *         description: Password changed successfully
    *       403:
    *         description: Access Token is not provided
    */
    app.post("/api/profile/changePassword", [authJwt.verifyToken], profileController.changePassword);

    app.post("/api/profile/uploadProfilePhoto", [authJwt.verifyToken], profileController.uploadProfilePhoto);

    app.post("/api/profile/updateProfile", [authJwt.verifyToken], profileController.updateProfile);

    app.get("/api/profile/getProfile", [authJwt.verifyToken], profileController.getProfile);

    app.post("/api/profile/sendEmailOtp", [authJwt.verifyToken], profileController.sendEmailOtp);

    app.post("/api/profile/verifyOtp", [authJwt.verifyToken], profileController.verifyOtp);

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