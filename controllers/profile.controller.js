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

exports.updateProfile = (req, res) => {
    delete req.body.password
    delete req.body._id
    delete req.body.username
    delete req.body.roles
    User.findByIdAndUpdate({ "_id": req.userId }, req.body, function (err, result) {
        if (err) {
            console.error(err)
        }
        else {
            return res.status(200).send({ message: "Profile updated successfully" });
        }
    })
}

exports.getProfile = (req, res) => {
    User.findById({
        "_id": req.userId
    }, { "password": 0 }, function (err, result) {
        if (err) {
            console.error(err)
        }
        else {
            return res.status(200).send({ result: result });
        }
    })
}