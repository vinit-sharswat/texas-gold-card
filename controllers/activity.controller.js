const db = require("../models");
const Activity = db.activity;

exports.addActivity = (req, res) => {
    let current_dateTime = new Date();

    const activity = new Activity({
        activity: req.body.activity,
        created_at: current_dateTime,
        user: req.userId
    })

    activity.save((err, activity) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({ message: "Activity inserted successfully!", "activity_id": activity._id });
    });
}

exports.getActivityByParams = (req, res) => {
    Activity.find(req.body.searchData, { __v: 0 }, function (err, result) {
        if (err) {
            console.error(err)
            res.status(500).send({ message: err });
        }
        else {
            return res.status(200).send(result);
        }
    })
}

exports.updateActivity = (req, res) => {
    Activity.findOneAndUpdate({
        _id: req.body.activity_id
    }, { activity: req.body.activity }, function (err, result) {
        if (err) {
            console.log(err)
            res.status(500).send({ message: err });
        }
        else {
            if (result) {
                return res.status(200).send('Activity Updated');
            }
            else {
                res.status(400).send('Activity not found')
            }
        }
    })
}