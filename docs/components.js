module.exports = {
    components: {
        schemas: {
            loginInfo: {
                type: 'object',
                properties: {
                    username: {
                        type: 'string',
                        description: "Username",
                        example: "vinit"
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
                    username: {
                        type: 'string',
                        description: "Username",
                        example: "vinit"
                    },
                    password: {
                        type: 'string',
                        description: "Password",
                        example: "sharswat"
                    },
                    email: {
                        type: 'string',
                        description: 'Email Id of the user',
                        example: "chirpy.coders@gmail.com"
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