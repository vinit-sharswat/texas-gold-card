module.exports = {
    post: {
        tags: ['Auth Apis'],
        description: "Sign-up API",
        parameters: [],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/signupInfo'
                    }
                }
            }
        },
        responses: {
            '200': {
                description: "Signup Successful"
            },
            '400': {
                description: "Failed! Username is already in use!"
            },
            '500': {
                description: 'Server error'
            }
        }
    }
}