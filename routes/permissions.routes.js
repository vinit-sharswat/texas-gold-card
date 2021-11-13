const { authJwt } = require("../middlewares");
const controller = require("../controllers/permissions.controller");

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
    * /permissions/add:
    *    post:
    *     tags:
    *       - Permissions Apis
    *     name: Add Permission API
    *     summary: Adds a permission
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
    *             activity:
    *               type: string
    *         required:
    *           - name
    *     responses:
    *       200:
    *         description: Permission has been added successfully
    *       403:
    *         description: Access Token is not provided
    */
    app.post("/permissions/add", [authJwt.verifyToken], controller.addPermission);

    /**
    * @swagger
    * /permissions/get:
    *    post:
    *     tags:
    *       - Permissions Apis
    *     name: GET Permission API
    *     summary: gets list of permissions
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
    *             searchData:
    *               type: object
    *             limit:
    *               type: integer
    *             skip:
    *               type: integer
    *     responses:
    *       200:
    *         description: Permission have been sent successfully
    *       403:
    *         description: Access Token is not provided
    */
    app.post("/permissions/get", [authJwt.verifyToken], controller.getPermissions);

    /**
    * @swagger
    * /permissions/update:
    *    post:
    *     tags:
    *       - Permissions Apis
    *     name: Update Permission API
    *     summary: update a permission
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
    *             _id:
    *               type: string
    *             name:
    *               type: string
    *         required:
    *           - name
    *     responses:
    *       200:
    *         description: Permission has been updated successfully
    *       403:
    *         description: Access Token is not provided
    */
    app.post("/permissions/update", [authJwt.verifyToken], controller.updatePermissions);

}
