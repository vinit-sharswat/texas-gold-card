const db = require("../models");
const User = db.user;

var bcrypt = require("bcryptjs");

exports.addStaff = (req, res) => {
    if (!["superadmin"].includes(req.role)) {
        res.status(401).send({ message: "Only superadmin is allowed to add Staff" });
    }
    const user = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        phoneNumber: req.body.phoneNumber,
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
        addedBy: req.userId,
        roles: "staff"
    });

    user.save(err => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        res.send({ message: "Staff has been added successfully!" });
    })
}

exports.updateStaff = (req, res) => {
    User.findOneAndUpdate({ "email": req.email }, req.body, function (err, result) {
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
    User.findOneAndDelete({ "email": req.email }, function (err, result) {
        if (err) {
            console.error(err)
            res.status(500).send({ message: err });
        }
        else {
            return res.status(200).send({ message: "Staff is deleted successfully" });
        }
    })
};

exports.searchStaffByParams = (req, res) => {
    User.find(req.body.searchData, { _id: 0, __v: 0, profilePicture: 0, password: 0, roles: 0 }, { limit: req.body.limit, skip: req.body.skip })
        .lean()
        .exec((err, result) => {
            if (err) {
                console.error(err)
                res.status(500).send({ message: err });
            }
            return res.status(200).send(result);
        })
}
