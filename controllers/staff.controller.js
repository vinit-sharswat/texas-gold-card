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
