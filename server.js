// ToDo: Setup Prometheus to track the application and winston to log messages beautifully
// ToDo: Setup refreshAccessToken code so that user is not logged out at any point in time

const express = require("express");
const cors = require("cors");
var bcrypt = require("bcryptjs");
const swaggerUI = require("swagger-ui-express");
var fileupload = require("express-fileupload");
const dbConfig = require("./config/db.config");
const docs = require('./docs');

const app = express();
app.use(fileupload());

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));

const db = require("./models");
const Role = db.role;
const User = db.user;

db.mongoose
    .connect(dbConfig.DB_CONNECTION_STRING, {
        tlsCAFile: `./certs/${dbConfig.DB_CERT_FILENAME}`,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

app.get("/", (req, res) => {
    res.send(`<h1>Welcome to Backend application.</h1><b>Have a look at the Swagger Documentation at /api-docs.</b><br><br>Connect with chirpy.coders@gmail.com for this application`);
});

// routes
require('./routes/auth.routes')(app);
require('./routes/profile.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count == 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });

            new Role({
                name: "superuser"
            }).save((err, data) => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'superuser' to roles collection");

                new User({
                    applicationType: "individual",
                    email: "chirpy.coders@gmail.com",
                    password: bcrypt.hashSync("texas-gold-card", 8),
                    phoneNumber: "919098991882",
                    firstName: "Chirpy",
                    lastName: "Coders",
                    profilePicture: { "data": "", "contentType": "" },
                    dob: "07-09-1994",
                    address: "Dalibaba",
                    city: "Satna",
                    state: "Madhya Pradesh",
                    zipCode: "485001",
                    emailAuth: true,
                    phoneAuth: true,
                    referredBy: "",
                    numberOfCards: 1,
                    groupAffliations: "",
                    roles: [data._id],
                }).save(err => {
                    if (err) {
                        console.log("error", err);
                    }
                    console.log(`added username:chirpy with password:texas-gold-card to role superuser`);
                });
            });

            new Role({
                name: "member"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'member' to roles collection");
            });
            new Role({
                name: "seller"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'seller' to roles collection");
            });

        }
    });
}
