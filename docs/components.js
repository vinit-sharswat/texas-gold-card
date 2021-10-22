module.exports = {
    components: {
        schemas: {
            loginInfo: {
                type: 'object',
                properties: {
                    email: {
                        type: 'string',
                        description: "Email",
                        example: "vinitsharswat@gmail.com"
                    },
                    password: {
                        type: 'string',
                        description: "Password",
                        example: "sharswat"
                    }
                }
            },
            signupInfo: {
                type: 'object',
                properties: {
                    applicationType: {
                        type: 'string',
                        description: "Application Type. Can take values in individual/corporate",
                        example: "individual"
                    },
                    email: {
                        type: 'string',
                        description: 'Email Id of the user',
                        example: "chirpy.coders@gmail.com"
                    },
                    password: {
                        type: 'string',
                        description: "Password",
                        example: "sharswat"
                    },
                    phoneNumber: {
                        type: 'string',
                        description: "Phone Number of the customer",
                        example: "91-9479511471"
                    },
                    firstName: {
                        type: 'string',
                        description: "First Name of the customer",
                        example: "Chirpy"
                    },
                    lastName: {
                        type: 'string',
                        description: "Last Name of the customer",
                        example: "Coders"
                    },
                    dob: {
                        type: 'string',
                        description: "Date of Birth of the customer",
                        example: "07-11-1992"
                    },
                    address: {
                        type: 'string',
                        description: "Address of the customer",
                        example: "Dalibaba Satna"
                    },
                    city: {
                        type: 'string',
                        description: "City of the customer residing in",
                        example: "Satna"
                    },
                    state: {
                        type: 'string',
                        description: "State of the customer residing in",
                        example: "Madhya Pradesh"
                    },
                    zipCode: {
                        type: 'string',
                        description: "ZipCode of the customer residing in",
                        example: "485001"
                    },
                    referredBy: {
                        type: 'string',
                        description: "Referred By",
                        example: "referredBy user info"
                    },
                    numberOfCards: {
                        type: 'integer',
                        description: "Number of Cards",
                        example: 1
                    },
                    groupAffliations: {
                        type: 'string',
                        description: "Group Affliations",
                        example: "some_group_name"
                    },
                    typeOfBusiness: {
                        type: 'string',
                        description: "Type of Business",
                        example: "IT"
                    },
                    numberOfEmployees: {
                        type: 'integer',
                        description: "Number of Employees in the business",
                        example: 50
                    },
                    numberOfLocations: {
                        type: 'integer',
                        description: "Number of Locations for the business",
                        example: 2
                    },
                    roles: {
                        type: 'list',
                        description: 'Roles user has access to',
                        example: ['admin']
                    }
                }
            }
        }
    }
}