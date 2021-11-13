const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateEmailorPhoneNumber = (req, res, next) => {
    // Email
    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            res.status(400).send({ message: "Failed! Email is already in use!" });
            return;
        }

        // PhoneNumber
        User.findOne({
            phoneNumber: req.body.phoneNumber
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (user) {
                res.status(400).send({ message: "Failed! PhoneNumber is already in use!" });
                return;
            }

            next();
        });

    })
}

const verifySignUp = {
    checkDuplicateEmailorPhoneNumber
};

module.exports = verifySignUp;