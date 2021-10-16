module.exports = {
    post: {
        tags: ['Auth Apis'],
        description: "Sign-in API",
        parameters: [],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/loginInfo'
                    }
                }
            }
        },
        responses: {
            '200': {
                description: "Login Successful"
            },
            '404': {
                description: "User is not found"
            },
            '500': {
                description: 'Server error'
            }
        }
    }
}