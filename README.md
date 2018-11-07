# ELEKS Front-Camp 2018

* Course curator - [Taras Pashko](https://github.com/etrn)
* Front-camp [Facebook](https://www.facebook.com/groups/270300106928894)

## Sample Authentication

[Demo]()  
> In this [NodeJS](https://nodejs.org/uk/)/[Express](https://expressjs.com/) app I used [MongoDB](https://www.mongodb.com/) 
as database and [PassportJS API](http://www.passportjs.org/) for authentication;
> For hashing user's password I used [bcryptjs](https://www.npmjs.com/package/bcryptjs); 
[Nexmo](https://www.nexmo.com/) for sending sms to user, and [Nodemailer](https://nodemailer.com/about/) for sending e-mail;
> Also I used [express-session](https://www.npmjs.com/package/express-session) and [express-messages](https://www.npmjs.com/package/express-messages);
> I used [pug](https://pugjs.org/api/getting-started.html) for views and [node-sass](https://www.npmjs.com/package/node-sass) for styling;
> User can sign in with Facebook 
> (**"Enforce HTTPS. This setting requires HTTPS for OAuth Redirects and pages getting access tokens with the JavaScript SDK. All new apps created as of March 2018 have this setting on by default and you should plan to migrate any existing apps to use only HTTPS URLs by March 2019. Most major cloud application hosts provide free and automatic configuration of TLS certificates for your applications. If you self-host your app or your hosting service doesn't offer HTTPS by default, you can obtain a free certificate for your domain(s) from Let's Encrypt."*), 
> Google and Github, or choose local account;

## Tech stack

* javascript
* html/scss
* mongodb

## Mockups
![SignUP page](https://github.com/stelmakhivan/authentication/blob/master/mockups/01.jpg)
![LOG IN page](https://github.com/stelmakhivan/authentication/blob/master/mockups/02.jpg)
![User's page](https://github.com/stelmakhivan/authentication/blob/master/mockups/03.jpg)
![Google's oauth page](https://github.com/stelmakhivan/authentication/blob/master/mockups/04.jpg)
![Github's oauth page](https://github.com/stelmakhivan/authentication/blob/master/mockups/05.jpg)

## Contribution guide
[Contribution](https://github.com/stelmakhivan/)

## TODO
1) Clone this project
2) Install [NodeJS](https://nodejs.org/uk/)
3) Install [MongoDB](https://www.mongodb.com/)
4) Create `.env` file with your configs
```sh
DB_SECRET=<YOUR_SECRET>
PORT=8080
NEXMO_API_KEY=<YOUR_API_KEY>
NEXMO_API_SECRET=<YOUR_API_SECRET>
GOOGLE_ACCOUNT=<YOUR_GOOGLE_ACCOUNT>
GOOGLE_PASSWORD=<YOUR_GOOGLE_PASS
FACEBOOK_APP_ID=<YOUR_FACEBOOK_APP_ACCOUNT>
FACEBOOK_APP_SECRET=<YOUR_FACEBOOK_APP_SECRET>
FACEBOOK_CALLBACK_URL=/users/facebook/callback
GOOGLE_CLIENT_ID=<YOUR_GOOGLE_ID>
GOOGLE_CLIENT_SECRET=<YOUR_GOOGLE_SECRET>
GOOGLE_CALLBACK_URL=/users/google/callback
GITHUB_CLIENT_ID=<YOUR_GITHUB_ID>
GITHUB_CLIENT_SECRET=<YOUR_GITHUB_SECRET>
GITHUB_CALLBACK_URL=/users/github/callback
```
5) Start MongoDB server
```sh
net start MongoDB
```
For Windows 32 bit I used this command
```sh
mongod --storageEngine=mmapv1 --dbpath C:/mongodb/data/db
```
6) Install all packages
```sh
npm i
```
6) Run `Nodemon`
```sh
npm run devserver
```

## My App [Heroku](https://www.heroku.com/)
