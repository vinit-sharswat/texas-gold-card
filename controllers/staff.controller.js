const mongoose = require("mongoose");
const config = require("../config/auth.config");
const db = require("../models");
const Staff = db.staff;
const Permissions = db.permissions;

var bcrypt = require("bcryptjs");

exports.addStaff = (req, res) => {
    const staff = new Staff({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        phoneNumber: req.body.phoneNumber,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        profilePicture: {
            data: "",
            contentType: "image/png"
        },
        dob: req.body.dob,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        emailAuth: false,
        phoneAuth: false,
        addedBy: req.userId
    });

    staff.save((err, result) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({ message: "Staff has been added successfully!" });
    });
};

exports.updateStaff = (req, res) => {
    Staff.find({ "email": req.email }, req.body, function (err, result) {
        if (err) {
            console.error(err)
            res.status(500).send({ message: err });
        }
        else if (result.length === 0) {
            return res.status(400).send({ message: "Staff Email ID is not found" });
        }
        else {
            return res.status(200).send({ message: "Staff Profile updated successfully" });
        }
    })
};

exports.deleteStaff = (req, res) => {
    Staff.findOneAndDelete({ "email": req.email }, function (err, result) {
        if (err) {
            console.error(err)
            res.status(500).send({ message: err });
        }
        else {
            return res.status(200).send({ message: "Staff is deleted successfully" });
        }
    })
};
