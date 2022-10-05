<a name="readme-top"></a>


<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h1 align="center"> Tweet Scheduler</h1>

  <p align="center">
    A web app to help me automatically post several tweets everyday!
    <br />
    <br />
    <a href="https://havard-twitter.herokuapp.com/">View Demo</a>
    ·
    <a href="mailto:freeze4allems@gmail.com">Report Bug</a>
    ·
    <a href="mailto:freeze4allems@gmail.com">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#architectural-design">Architectural Design</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#features">Features</a></li>
    <li><a href="#improvement">Proposed Improvement</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Twitter Scheduler][product-screenshot]](https://havard-twitter.herokuapp.com/)

I have always struggled with tweeting consistently as I always get get too busy and occasionally find it as an hassle to open the twitter app, so to combat this, I decided to create a web app that will house some of my ideas and thoughts and tweet for me consistently everyday.

The idea is to set a certain number of tweets per day and the web app will take care of tweeting these ideas everyday.

Here are some of the reasons why I built this:
* For my [Harvard CS50](https://cs50.harvard.edu/x/2022/project/) Final project
* So that I can dedicate 1 day to write about 50-60 ideas and the webapp will take care of tweeting them on my behalf for the next few days/weeks.
* Automate my tweeting :smile:

As of the time of writing this, this project can only work for the admin user or me, however I have made it possible that people can register. I will start working on making this product available to other users when or if the registered user reach 2000.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

This is the list of frameworks/libraries and tools used to bootstrap my project

* [![MongoDB][Mongodb.js]][Mongodb-url]
* [![Express][Express.js]][Express-url]
* [![Node][Node.js]][Node-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- GETTING STARTED -->
## Getting Started

This will guide you through the process I took in building a web app that tweets everyday for me

### Prerequisites

This is a list of all the Node Modules I used in building this web app


| Npm Package | Use |
| :--- | :--- |
| [axios][axios-url] |  Make http requests from node.js |
| [bcryptjs][bcryptjs-url] | To Hash user Passwords into database |
| [connect-flash][connect-flash-url] | To display error and success messages to users |
| [connect-mongo][connect-mongo-url] | To save sessions into MongoDb database |
| [cron][cron-url] | Used to create a cron job that runs at various times of the day |
| [csurf][csurf-url]  | To protect users against cross-site-request-forgery |
| [dotenv][dotenv-url] | To save sensitive credentials to a dotenv file |
| [ejs][ejs-url] | Express templating engine I used |
| [express][express-url] | To create server, router and middleware |
| [express-sessions][express-sessions-url] | To create sessions |
| [mongodb][mongodb-url] | The database used |
| [nodemon][nodemon-url] | Used to monitor file changes in my server and then automatically restart the server |
| [sanitize-html][sanitize-html-url] | To sanitize user input values before saving into the database |
| [twitter-api-v2][twitter-api-v2-url] | Used to create a connection with the twitter api and also tweet |
| [validator][validator-url] | To validate user input |


* npm
  ```sh
  npm install npm@latest -g
  ```

### Architectural Design

This web app was built using the MVC (Models, View, Controller) architectural design in the sense that the `views` folder is used for all the front-end code, the `controllers` folder is responsible for receiving request and sending request to the appropraite model, while the `models` folder is responsible for all the validation, verification and database actions needed.

* `app.js` - responsible for housing all the middleware and most of the app general functionality like sessions, csrf security and so on
* `db.js` - responsible for creating the connection to the MongoDB database and also listening to incoming request, because if the app can't connect to the db, the app shouldn't start
* `mycron.js` - responsible for the cronjob that tweeets to twitter
* `router.js` - responsible for sending request to the right controller and also other middlewares controllers 
* `twitter.js` - responsible for connecting to the twitter api

When a request is sent to the Express server (Which is 'listening' in the `db.js` file), the request is passed on the `router.js` file which then sends the request to the appropriate `controller` which determines the `models` function to run and in return the `views` template to render. 



### Installation

_This is the simple installation of the app._

1. Clone or download these files
2. Install all the Node packages by simply 
   ```sh
   npm install
   ```
3. Create a `.env` file or create environment variables and save these variables in there
   ```js
   CONNECTIONSTRING=**************************  /* Your MongoDB connection string */
   PORT=**** /* you can use 3000 or if you are using heroku leave it blank */
   APPKEY=**********************  /* These next 4 variables can be obtained from your twitter developer account, you can read the documentation from the npm twitter-api-v2 documentation */
   APPSECRET=******************
   ACCESSTOKEN=*********************************
   ACCESSSECRET=*****************************
   ```
4. Create a MongoDB database and create 3 collections `users` and `tweets`
5. Reach out to me to talk about the structure of the database or study the `User.js` file
6. You are ready to launch

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- FEATURES -->
## Features

- Object Oriented Programming
- Authetication using sessions
- Password Harshing
- User roles
- Cross site request forgery (Csrf) Protection
- Tweet Functionality


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- IMPROVEMENTS -->
## Improvement

- [ ] Edit Cron Job 
- [ ] Schedule the tweet by date
- [ ] Schedule the tweet by priority
- [ ] Properly accounting for other users
- [ ] Allowing users to sign in to twitter account and giving the right authentication
- [ ] Allowing registered users to also schedule their tweets


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

[![twitter][twitter-img]][twitter-url] 
[![email][email-img]][email-url]

Project Link: [The Tweet Sheduling App](https://havard-twitter.herokuapp.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS 
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
* [Malven's Grid Cheatsheet](https://grid.malven.co/)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
-->


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: /screenshot.jpeg
[Node.js]: https://img.shields.io/badge/node.js-6BA45E?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node-url]: https://nodejs.org/en/
[Mongodb.js]: https://img.shields.io/badge/Mongodb-20232A?style=for-the-badge&logo=mongodb&logoColor=#00684A
[Mongodb-url]: https://www.mongodb.com/
[Express.js]: https://img.shields.io/badge/Express.js-35495E?style=for-the-badge&logo=express&logoColor=4FC08D
[Express-url]: https://www.npmjs.com/package/express
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com

[twitter-img]: https://img.shields.io/badge/twitter-000000?style=for-the-badge&logo=twitter&logoColor=blue
[twitter-url]: https://twitter.com/Mos__zaid
[email-img]: https://img.shields.io/badge/gmail-000000?style=for-the-badge&logo=gmail&logoColor=red
[email-url]: mailto:freeze4allems@gmail.com

<!-- NPM REQUIREMENTS LINKS -->
[axios-url]: https://www.npmjs.com/package/axios
[bcryptjs-url]: https://www.npmjs.com/package/bcrypt
[connect-flash-url]: https://www.npmjs.com/package/connect-flash
[connect-mongo-url]: https://www.npmjs.com/package/connect-mongo
[cron-url]: https://www.npmjs.com/package/cron
[csurf-url]: https://www.npmjs.com/package/csurf
[dotenv-url]: https://www.npmjs.com/package/dotenv
[ejs-url]: https://www.npmjs.com/package/ejs
[express-url]: https://www.npmjs.com/package/express
[express-sessions-url]: https://www.npmjs.com/package/express-sessions
[mongodb-url]: https://www.npmjs.com/package/mongodb
[nodemon-url]: https://www.npmjs.com/package/nodemon
[sanitize-html-url]: https://www.npmjs.com/package/sanitize-html
[twitter-api-v2-url]: https://www.npmjs.com/package/twitter-api-v2
[validator-url]: https://www.npmjs.com/package/validator
