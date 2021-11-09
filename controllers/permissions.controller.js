const db = require("../models");
const Permissions = db.permissions;

exports.addPermission = (req, res) => {
    const permission = new Permissions({
        name: req.body.name,
        addedBy: req.userId
    });

    permission.save((err, result) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({ message: "Permission has been added successfully!" });
    });
};

exports.getPermissions = (req, res) => {
    Permissions.find({}, { __v: 0 })
        .lean()
        .exec((err, result) => {
            if (err) {
                console.error(err)
                res.status(500).send({ message: err });
            }
            return res.status(200).send(result);
        })
}

exports.updatePermissions = (req, res) => {
    Permissions.findByIdAndUpdate({ "_id": req.body._id }, req.body, function (err, result) {
        if (err) {
            console.error(err)
            res.status(500).send({ message: err });
        }
        else if (result.length === 0) {
            return res.status(400).send({ message: "Permissions is not found" });
        }
        else {
            return res.status(200).send({ message: "Permission updated successfully" });
        }
    })
};
