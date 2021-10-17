# Texas-Gold-Card Backend Apis

This is the list of APIs that have been built in NodeJS for user authentication and other purposes.

## APIs built: 
Auth APIs: signup, signin
Profile APIs: changePassword, updateProfile, sendEmailOtp, verifyOtp, uploadprofilephoto, getProfile

## Usage: 
* Install the node_modules
```sh
npm install
```

* Create .env file
```sh
AUTH_SECRET = <Auth Secret Key>

MONGO_HOST = <MongoDB Host Key>
MONGO_PORT = <MongoDB PORT>
MONGO_DB = <MongoDB Database Name>

EMAIL_ID = <Email ID from which the OTP mail will be sent>
EMAIL_PASSWORD = <Password of the email from where the OTP will be sent>
```
## Contributing
We love contributions!! Please start by creating a github issue and we will help you out.