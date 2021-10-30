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

    /**
    * @swagger
    * /api/profile/uploadProfilePhoto:
    *    post:
    *     tags:
    *       - Profile Apis
    *     name: Upload Profile Pic API
    *     summary: Uploads/Updates profile pic of a user
    *     security:
    *       - accessToken: []
    *     consumes:
    *       - multipart/form-data
    *     parameters:
    *       - in: formData
    *         name: userPhoto
    *         description: The file to upload
    *         required: true
    *         type: file
    *     responses:
    *       200:
    *         description: Profile Updated successfully
    *       403:
    *         description: Access Token is not provided
    */
    app.post("/api/profile/uploadProfilePhoto", [authJwt.verifyToken], profileController.uploadProfilePhoto);

    /**
    * @swagger
    * /api/profile/updateProfile:
    *    post:
    *     tags:
    *       - Profile Apis
    *     name: Update Profile API
    *     summary: Update profile of a user
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
    *             applicationType:
    *               type: string
    *             firstName:
    *               type: string
    *             lastName:
    *               type: string
    *             dob:
    *               type: string
    *             address:
    *               type: string
    *             city:
    *               type: string
    *             state:
    *               type: string
    *             zipCode:
    *               type: string
    *             referredBy:
    *               type: string
    *             numberOfCards:
    *               type: integer
    *             groupAffliations:
    *               type: string
    *             typeOfBusiness:
    *               type: string
    *             numberOfEmployees:
    *               type: integer
    *             numberOfLocations:
    *               type: integer
    *     responses:
    *       200:
    *         description: Photo uploaded successfully
    *       403:
    *         description: Access Token is not provided
    */
    app.post("/api/profile/updateProfile", [authJwt.verifyToken], profileController.updateProfile);

    app.get("/api/profile/getUserProfile", [authJwt.verifyToken], profileController.getUserProfile);

    /**
    * @swagger
    * /api/profile/sendEmailOtp:
    *    post:
    *     tags:
    *       - Profile Apis
    *     name: Send Email OTP API
    *     summary: Sends OTP to the registered email
    *     security:
    *       - accessToken: []
    *     responses:
    *       200:
    *         description: OTP sent on email successfully
    *       403:
    *         description: Access Token is not provided
    */
    app.post("/api/profile/sendEmailOtp", [authJwt.verifyToken], profileController.sendEmailOtp);

    /**
    * @swagger
    * /api/profile/verifyOtp:
    *    post:
    *     tags:
    *       - Profile Apis
    *     name: Verify OTP API
    *     summary: Verify Sent OTP
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
    *             validation_type:
    *               type: string
    *               enum: ["email", "phone"]
    *             otp:
    *               type: string
    *     responses:
    *       200:
    *         description: OTP verified successfully
    *       400:
    *         description: OTP has been expired
    *       403:
    *         description: Access Token is not provided
    */
    app.post("/api/profile/verifyOtp", [authJwt.verifyToken], profileController.verifyOtp);

    /**
    * @swagger
    * /api/profile/sendPhoneOtp:
    *    post:
    *     tags:
    *       - Profile Apis
    *     name: Send OTP on Phone API
    *     summary: Sends OTP to the registered phone
    *     security:
    *       - accessToken: []
    *     responses:
    *       200:
    *         description: OTP sent on phone successfully
    *       403:
    *         description: Access Token is not provided
    */
    app.post("/api/profile/sendPhoneOtp", [authJwt.verifyToken], profileController.sendPhoneOtp);

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