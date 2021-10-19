const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');

// To add minutes to the current time
function AddMinutesToDate(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD
    }
});

var mailOptions = {
    from: process.env.EMAIL_ID,
    to: '',
    subject: 'Texas Gold Card: OTP Sent for email authentication',
    text: ''
};

const db = require("../models");
const User = db.user;
const Otp = db.otp;

exports.changePassword = (req, res) => {
    User.findByIdAndUpdate({ "_id": req.userId }, { "password": bcrypt.hashSync(req.body.password, 8) }, function (err, result) {
        if (err) {
            console.error(err)
            res.status(500).send({ message: err });
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
            res.status(500).send({ message: err });
        }
        else {
            return res.status(200).send({ message: "Profile Photo uploaded successfully" });
        }
    })
};

exports.updateProfile = (req, res) => {
    User.findByIdAndUpdate({ "_id": req.userId }, req.body, function (err, result) {
        if (err) {
            console.error(err)
            res.status(500).send({ message: err });
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
            res.status(500).send({ message: err });
        }
        else {
            return res.status(200).send({ result: result });
        }
    })
}

exports.sendEmailOtp = (req, res) => {
    User.findById({
        "_id": req.userId
    }, { "email": 1 }, function (err, result) {
        if (err) {
            console.error(err)
            res.status(500).send({ message: err });
        }
        else {
            otp = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChars: false });
            mailOptions.to = result.email
            mailOptions.html = `Dear User, <br><br>OTP for Login is :<br><br><h1>${otp}</h1><br><br>Kindly note that OTP will expire in 5 minutes.<br><br><i>This is a auto-generated email.Please do not reply to this email</i><br><br>Regards<br><b>Texas Gold Card<b><br><br>`
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    res.status(500).send({ message: error });
                } else {
                    console.log('Email sent: ' + info.response);
                    let current_dateTime = new Date();

                    otp_input = {
                        otp: otp,
                        created_at: current_dateTime,
                        expiration_time: AddMinutesToDate(current_dateTime, 5),
                        validation_type: "email",
                        user: req.userId
                    }
                    options = { upsert: true, new: true, setDefaultsOnInsert: true };

                    // Find the document
                    Otp.findOneAndUpdate({ "validation_type": "email", "user": req.userId }, otp_input, options, function (error, result) {
                        if (error) {
                            console.log(error)
                            res.status(500).send({ message: error });
                        }
                        else
                            return res.status(200).send('OTP has been sent successfully on email');
                    });
                }
            });
        }
    });
}

exports.verifyOtp = (req, res) => {
    Otp.findOne({
        "user": req.userId,
        "validation_type": req.body.validation_type,
        "expiration_time": { $gt: new Date() }
    }, { otp: 1 }, function (err, result) {
        if (err) {
            console.error(err)
            res.status(500).send({ message: err });
        }
        else {
            if (result) {
                if (result.otp === req.body.otp) {
                    // OTP Matched
                    let data = { "phoneAuth": true }
                    if (req.body.validation_type === "email") {
                        data = { "emailAuth": true }
                    }
                    User.findOneAndUpdate({
                        "user": req.userId
                    }, data, function (err, result) {
                        if (err) {
                            console.log(err)
                            res.status(500).send({ message: err });
                        }
                        else {
                            return res.status(200).send('OTP matched');
                        }
                    })
                }
                else {
                    return res.status(400).send('OTP did not match');
                }
            }
            else {
                console.log("Record not found for OTP: OTP Expired")
                return res.status(400).send('OTP has been expired');
            }
        }
    })
}