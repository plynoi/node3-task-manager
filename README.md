# Node.js Task Manager Example
- version: 1.0.0
- Last update: April 2022
- Environment: Windows WSL
- Prerequisite: [Docker and Internet connection](#prerequisite)

## <a id="intro"></a>Introduction

This is an example project from [Udemy](https://www.udemy.com/)'s [The Complete Node.js Developer Course (3rd Edition)](https://www.udemy.com/course/the-complete-nodejs-developer-course-2/) course.

This Node.js web application lets you create, update, and delete your to-do tasks. 

The technologies and services under the hood are as follows:
* [MongoDB](https://www.mongodb.com/) for keeping data.
* [SendGrid API](https://sendgrid.com/) for sending email.

## <a id="prerequisite"></a>Prerequisite
1. [Node.js](https://nodejs.org/en/) runtime with [NPM](https://www.npmjs.com/).
2. Internet connection.
3. [MongoDB](https://www.mongodb.com/) software.
4. [SendGrid API](hhttps://sendgrid.com/) account.

## <a id="running"></a>How To Run 

1. Install MongoDB on your machine.
2. SendGrid API Access Token. Please see more detail on these [API Keys](https://docs.sendgrid.com/ui/account-and-settings/api-keys) and [Authenticaion](https://docs.sendgrid.com/for-developers/sending-email/authentication) pages.
3. Create a file name ```dev.env``` in the ```config``` folder with the following content:
    ```
    PORT=3000
    SENDGRID_API_KEY=<SendGrid API Key>
    SENDGRID_YOUR_EMAIL=<Your email>
    JWT_SECRET=<Your authenticaion secret string>
    MONGODB_URL=mongodb://127.0.0.1:27017/task-manager-api
    ```
4. Install application dependencies with the following command.
    ```
    $> npm install
    ```
5. Once the installation process is successful, run the application with the following command
    ```
    $> npm run start
    ```
## <a id="heroku"></a>Heroku Deployment

The application is hosted on [Heroku](https://www.heroku.com/) Cloud Application Platform at [https://plynoi-task-manager.herokuapp.com/](https://plynoi-task-manager.herokuapp.com/) page.

## <a id="author"></a>Author

Author: Wasin Waeosri ([plynoi.com](https://plynoi.com/))