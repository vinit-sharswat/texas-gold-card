const { authJwt } = require("../middlewares");
const controller = require("../controllers/activity.controller");

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
    * /api/activity:
    *    put:
    *     tags:
    *       - Activity Apis
    *     name: Add Activity API
    *     summary: adds activity of a user
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
    *           - activity
    *     responses:
    *       200:
    *         description: Activity has been put in successfully
    *       403:
    *         description: Username not found
    */
    app.put("/api/activity", [authJwt.verifyToken], controller.addActivity)

    /**
    * @swagger
    * /api/activity/getByParams:
    *    post:
    *     tags:
    *       - Activity Apis
    *     name: Get Activity By Params API
    *     summary: get activity of a user by params
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
    *         required:
    *           - activity
    *     responses:
    *       200:
    *         description: Activity has been put in successfully
    *       403:
    *         description: Username not found
    */
    app.post("/api/activity/getByParams", [authJwt.verifyToken], controller.getActivityByParams)


    /**
    * @swagger
    * /api/activity/update:
    *    post:
    *     tags:
    *       - Activity Apis
    *     name: Update Activity API
    *     summary: update an activity
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
    *             activity_id:
    *               type: string
    *         required:
    *           - activity
    *           - activity_id
    *     responses:
    *       200:
    *         description: Activity has been updated successfully
    *       403:
    *         description: Username not found
    *       400:
    *         description: Activity not found
    */
    app.post("/api/activity/update", [authJwt.verifyToken], controller.updateActivity)
}