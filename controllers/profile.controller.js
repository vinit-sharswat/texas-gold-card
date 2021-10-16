var bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.user;

exports.changePassword = (req, res) => {
    User.findByIdAndUpdate({ "_id": req.userId }, { "password": bcrypt.hashSync(req.body.password, 8) }, function (err, result) {
        if (err) {
            console.error(err)
        }
        else {
            return res.status(200).send({ message: "Password changed successfully" });
        }
    })
};

exports.uploadProfilePhoto = (req, res) => {
    console.log(req.files)
    User.findByIdAndUpdate({ "_id": req.userId }, {
        "profilePicture": {
            data: req.files.userPhoto.data,
            contentType: req.files.userPhoto.mimetype
        }
    }, function (err, result) {
        if (err) {
            console.error(err)
        }
        else {
            return res.status(200).send({ message: "Profile Photo uploaded successfully" });
        }
    })
};
