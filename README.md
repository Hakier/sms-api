Simple Sms Gateway Api

## Description

Api uses [smsgateway.me](http://smsgateway.me/) to send messages using an Android device.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deploy to Heroku

To deploy to heroku you must create an app and push to master branch on heroku
`git push heroku master`

If app fails please check logs if you did not forget to set some environment variables. Seek in logs for messages like: `[ExceptionHandler] Config validation error: "CORS_ENABLED" is required`
At least you must enable `cors`, set sms gateway `token` and `device id`.

More info you can find here: [Deploying with Git](https://devcenter.heroku.com/articles/git)
