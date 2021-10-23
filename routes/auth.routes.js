const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

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
    * /api/auth/signup:
    *    post:
    *     tags:
    *       - Auth Apis
    *     name: Sign Up API
    *     summary: Adds a user
    *     consumes:
    *       - application/json
    *     parameters:
    *       - name: body
    *         in: body
    *         schema:
    *           type: object
    *           properties:
    *             email:
    *               type: string
    *             password:
    *               type: string
    *               format: password
    *             applicationType:
    *               type: string
    *               enum: ["individual", "corporate"]
    *             phoneNumber:
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
    *             roles:
    *               type: array
    *               oneOf:
    *                 type: string
    *         required:
    *           - email
    *           - password
    *           - phoneNumber
    *           - applicationType
    *           - roles
    *     responses:
    *       200:
    *         description: User registered successfully
    *       400:
    *         description: Bad Request
    */
    app.post("/api/auth/signup",
        [
            verifySignUp.checkDuplicateEmailorPhoneNumber,
            verifySignUp.checkRolesExisted
        ],
        controller.signup
    );


    /**
    * @swagger
    * /api/auth/signin:
    *    post:
    *     tags:
    *       - Auth Apis
    *     name: Login API
    *     summary: Logs in a user
    *     consumes:
    *       - application/json
    *     parameters:
    *       - name: body
    *         in: body
    *         schema:
    *           type: object
    *           properties:
    *             email:
    *               type: string
    *               example: chirpy.coders@gmail.com
    *             password:
    *               type: string
    *               format: password
    *               example: texas-gold-card
    *         required:
    *           - email
    *           - password
    *     responses:
    *       200:
    *         description: User found and logged in successfully
    *       401:
    *         description: Incorrect Password
    *       404:
    *         description: Username not found
    */
    app.post("/api/auth/signin", controller.signin);
};