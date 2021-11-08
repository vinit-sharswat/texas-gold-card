const db = require("../models");
const Staff = db.staff;

checkDuplicateEmailorPhoneNumber = (req, res, next) => {
    // Email
    Staff.findOne({
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
        Staff.findOne({
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

const verifyStaffSignUp = {
    checkDuplicateEmailorPhoneNumber,
};

module.exports = verifyStaffSignUp;