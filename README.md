## Getlayer Homepage

Simple institutional homepage developed in Node.js.

## Installation & use

```
$ git clone git@github.com:Upplication/landing.git
$ npm install
$ npm start
```
The server will start up at http://localhost:3000.

## Requirements

* [node](http://nodejs.org/)
* [npm](https://docs.npmjs.com/)

For the contact form to work, you need to create the app folder in the root and inside the /app folder, create a file email.js with the following code:
```
exports = {
   email_user: "YOUR EMAIL",
   email_pass: "YOUR PASSWORD",
   email_to: "ADDRESS THAT THE EMAIL SHOULD BE SENT"
}
```

## License
The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
