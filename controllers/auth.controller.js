const mongoose = require("mongoose");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    const user = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        phoneNumber: req.body.phoneNumber,
        applicationType: req.body.applicationType,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        profilePicture: "",
        dob: req.body.dob,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        emailAuth: false,
        phoneAuth: false,
        referredBy: req.body.referredBy,
        numberOfCards: req.body.numberOfCards,
        groupAffiliations: req.body.groupAffiliations,
        typeOfBusiness: req.body.typeOfBusiness,
        numberOfEmployees: req.body.numberOfEmployees,
        numberOfLocations: req.body.numberOfLocations,
        roles: "user"
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({ message: "User was registered successfully!" });
    })
}

exports.signin = (req, res) => {
    User.findOne({
        email: req.body.email
    }, { "__v": 0 })
        .lean()
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }
            var token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            delete user.password
            delete user.profilePicture
            delete user._id
            user.token = token
            res.status(200).send(user)
        });
};