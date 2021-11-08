const { authJwt, verifyStaffSignUp } = require("../middlewares");
const staffController = require("../controllers/staff.controller");
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
    * /api/staff/add:
    *    post:
    *     tags:
    *       - Staff Apis
    *     name: Add Staff API
    *     summary: adds a staff member
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
    *             email:
    *               type: string
    *             password:
    *               type: string
    *               format: password
    *             firstName:
    *               type: string
    *             lastName:
    *               type: string
    *             phoneNumber:
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
    *             addedBy:
    *               type: string
    *         required:
    *           - email
    *           - password
    *           - phoneNumber
    *     responses:
    *       200:
    *         description: Staff has been added successfully
    *       403:
    *         description: Access Token is not provided
    */
    app.post("/api/staff/add", [
        verifyStaffSignUp.checkDuplicateEmailorPhoneNumber,
        authJwt.verifyToken
    ],
        staffController.addStaff);
}
