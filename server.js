// ToDo: Setup Prometheus to track the application and winston to log messages beautifully
// ToDo: Setup refreshAccessToken code so that user is not logged out at any point in time

const express = require("express");
const cors = require("cors");
var bcrypt = require("bcryptjs");
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
var fileupload = require("express-fileupload");
const dbConfig = require("./config/db.config");
// const docs = require('./docs');

const app = express();
app.use(fileupload());

var corsOptions = {
    origin: ["http://localhost:8081", "https://texas-gold-card-backend-g4oyr.ondigitalocean.app"]
};

// app.use(cors(corsOptions));
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const swaggerDefinition = {
    info: {
        title: "Swagger Documentation",
        version: '1.0.0',
        description: 'Endpoints to test the application'
    },
    securityDefinitions: {
        accessToken: {
            type: 'apiKey',
            name: 'x-access-token',
            scheme: 'bearer',
            in: 'header',
        },
    }
}

const swaggerOptions = {
    swaggerDefinition,
    apis: ['./routes/*.js']
}
const swaggerSpec = swaggerJSDoc(swaggerOptions)

app.get('/swaggger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
})
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

const db = require("./models");
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
require('./routes/activity.routes')(app);
require('./routes/staff.routes')(app);
require('./routes/permissions.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`TGC Backend Server is running on port ${PORT}.`);
});

function initial() {
    const superadmin = new User({
        applicationType: "individual",
        email: "chirpy.coders@gmail.com",
        password: bcrypt.hashSync("texas-gold-card", 8),
        phoneNumber: "91-9098991882",
        firstName: "Chirpy",
        lastName: "Coders",
        profilePicture: "",
        dob: "07-09-1994",
        address: "Dalibaba",
        city: "Satna",
        state: "Madhya Pradesh",
        zipCode: "485001",
        emailAuth: true,
        phoneAuth: true,
        referredBy: "",
        numberOfCards: 1,
        groupAffiliations: "",
        roles: "superadmin"
    })
    User.findOne({
        email: "chirpy.coders@gmail.com"
    }, { "__v": 0 })
        .lean()
        .exec((err, user) => {
            if (err) {
                console.log("Unable to save the superuser")
            }

            if (!user) {
                superadmin.save(err => {
                    if (err) {
                        console.log("error", err);
                    }
                    console.log(`added username:chirpy with password:texas-gold-card to role superuser`);
                });
            }
            else {
                console.log("SuperAdmin already added")
            }
        })
}
