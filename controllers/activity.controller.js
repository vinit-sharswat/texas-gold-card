const db = require("../models");
const Activity = db.activity;
const User = db.user;
const Permissions = db.permissions;

exports.addActivity = (req, res) => {
    let current_dateTime = new Date();

    User.findById({
        "_id": req.userId
    }, { first_name: 1, last_name: 1, email: 1, roles: 1 }, function (err, result) {
        if (err) {
            console.error(err)
            res.status(500).send({ message: err });
        }
        else {
            const activity = new Activity({
                activity: req.body.activity,
                first_name: result.first_name,
                last_name: result.last_name,
                email: result.email,
                created_at: current_dateTime,
                user: req.userId,
                roles: result.roles
            })
            activity.save((err, activity) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                res.send({ message: "Activity inserted successfully!", "activity_id": activity._id });
            });
        }
    })
}

exports.getActivityByParams = (req, res) => {
    User.findById({
        _id: req.userId
    }, { "roles": 1, "_id": 0 })
        .lean()
        .exec((err, user) => {
            if (err) {
                console.log(err)
                res.status(500).send({ message: err });
                return;
            }
            if (!["superadmin", "staff"].includes(user.roles)) {
                req.body.searchData.user = req.userId
                Activity.find(req.body.searchData, { __v: 0 }, { limit: req.body.limit, skip: req.body.skip }, function (err, result) {
                    if (err) {
                        console.error(err)
                        res.status(500).send({ message: err });
                    }
                    else {
                        return res.status(200).send(result);
                    }
                })
            }
            else {
                Activity.find(req.body.searchData, { __v: 0 }, { limit: req.body.limit, skip: req.body.skip }, function (err, result) {
                    if (err) {
                        console.error(err)
                        res.status(500).send({ message: err });
                    }
                    else {
                        return res.status(200).send(result);
                    }
                })
            }
        })
}

exports.updateActivity = (req, res) => {
    Activity.findOneAndUpdate({
        _id: req.body.activity_id
    }, { activity: req.body.activity, user: req.userId }, function (err, result) {
        if (err) {
            console.log(err)
            res.status(500).send({ message: err });
        }
        else {
            if (result) {
                return res.status(200).send({ message: 'Activity Updated' });
            }
            else {
                res.status(400).send({ message: 'Activity not found' })
            }
        }
    })
}