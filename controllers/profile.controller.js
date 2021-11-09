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

const twilioClient = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

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

exports.sendPhoneOtp = (req, res) => {
    User.findById({
        "_id": req.userId
    }, { "phoneNumber": 1 }, function (err, result) {
        if (err) {
            console.error(err)
            res.status(500).send({ message: err });
        }
        else {
            otp = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChars: false });
            twilioClient.messages
                .create({
                    body: `Dear User,\n\nOTP for Login is :${otp}\n\nKindly note that OTP will expire in 5 minutes.\n\nThis is a auto-generated message.Please do not reply to this number\n\nRegards\nTexas Gold Card`,
                    from: process.env.TWILIO_FROM_NUMBER,
                    to: `+${result.phoneNumber}`
                })
                .then((resp) => {
                    console.log('Received output from twilio')
                    console.log(`Response from getPhoneNumberInfo: ${JSON.stringify(resp)}`);
                    let current_dateTime = new Date();

                    otp_input = {
                        otp: otp,
                        created_at: current_dateTime,
                        expiration_time: AddMinutesToDate(current_dateTime, 5),
                        validation_type: "phone",
                        user: req.userId
                    }
                    options = { upsert: true, new: true, setDefaultsOnInsert: true };

                    // Find the document
                    Otp.findOneAndUpdate({ "validation_type": "phone", "user": req.userId }, otp_input, options, function (error, result) {
                        if (error) {
                            console.log(error)
                            res.status(500).send({ message: error });
                        }
                        else
                            return res.status(200).send('OTP has been sent successfully on phone');
                    });

                })
                .catch((error) => {
                    console.log(`Error in Twilio Sending Message: ${error.message}`)
                    res.status(500).send({ message: error });
                })
        }
    });
}

exports.resetPassword = (req, res) => {
    Otp.findOne({
        "user": req.userId,
        "validation_type": "email",
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
                    let data = { "password": req.body.password }
                    User.findOneAndUpdate({
                        "user": req.userId
                    }, data, function (err, result) {
                        if (err) {
                            console.log(err)
                            res.status(500).send({ message: err });
                        }
                        else {
                            return res.status(200).send('Password has been reset successfully');
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

exports.searchUsersByParams = (req, res) => {
    User.find(req.body.searchData, { _id: 0, __v: 0, profilePicture: 0, password: 0 })
        .lean()
        .populate("roles", "-__v")
        .exec((err, result) => {
            if (err) {
                console.error(err)
                res.status(500).send({ message: err });
            }
            return res.status(200).send(result);
        })
}

exports.searchUser = (req, res) => {
    User.find({
        $or: [
            {
                'firstName': new RegExp(req.body.searchData, "i")
            },
            {
                'lastName': new RegExp(req.body.searchData, "i")
            },
            {
                "email": new RegExp(req.body.searchData, "i")
            },
            {
                "phoneNumber": new RegExp(req.body.searchData, "i")
            }
        ]
    }, { _id: 0, __v: 0, profilePicture: 0, password: 0 })
        .lean()
        .populate("roles", "-__v")
        .exec((err, result) => {
            if (err) {
                console.error(err)
                res.status(500).send({ message: err });
            }
            return res.status(200).send(result);
        })
}