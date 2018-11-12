# Contributing to Sample Authentication

## Contribution process overview

1. Fork this project.
2. Create a feature branch.
3. Make your changes.
4. Run the tests.
5. Push your changes to your fork/branch.
6. Open a pull request.

## For running app
1) Install [NodeJS](https://nodejs.org/uk/)
2) Install [MongoDB](https://www.mongodb.com/)
3) Create `.env` file with your configs
```sh
MONGODB=<LINK_TO_MONGODB>
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
4) Start MongoDB server
```sh
net start MongoDB
```
For Windows 32 bit I used this command
```sh
mongod --storageEngine=mmapv1 --dbpath C:/mongodb/data/db
```
5) Install all packages
```sh
npm i
```
6) Run `Nodemon`
```sh
npm run devserver
```
7) For [Facebook](https://facebook.com/) auth you can deploy your project to [Heroku](https://heroku.com/) (there are https server) and use db from [mLab](https://mlab.com/)
* Remember to config env variables on [Heroku](https://heroku.com/)
