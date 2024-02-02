# Brain Blitz
[Brain Blitz](https://brain-blitz-shawnliu.netlify.app/) is a web-based trivia game where the user answers ten questions pulled from the Open Trivia Database API. The user can either quiz themselves or compete against a friend. Once the user answers the ten questions, the app will grade each question and display the user's score and time taken. If two players are competing, the app will display a results screen after both players have submitted their answers. I built this app as my first project while learning React, then later added multiplayer functionality to learn Socket.IO.

The server code can be found [here](https://github.com/shawn8913/brain-blitz-server/tree/main)

### Built With
[![React][React.js]][React-url]\
[![Html][Html.js]][Html-url]\
[![CSS][CSS.js]][CSS-url]\
[![Socket.io][Socket.js]][Socket-url]\
[![Express][Express.js]][Express-url]\
[![Webpack][Webpack.js]][Webpack-url]

### Deployed With
[![Netlify][Netlify.js]][Netlify-url]\
[![Heroku][Heroku.js]][Heroku-url]

## Getting Started
### Build and Run the application:

```
$ npm install
$ npm run build
$ live-server
````

## Usage
* To host a game, click the "Host Game" button. You will receive a 4-letter game code.
  * Once another player has joined the lobby, you will see a "Connected" message.
  * Click the "Start Game" button to start the game for both players.
* To join a game, click the "Join Game" button and copy the 4-letter code given to the host.
  * Once you hit the "Connect" button, you will see a "Connected" message.
  * Wait for the host to start the game.
* To play in one-player mode, click the "1 Player" button. 

## Help
* Unfortunately, as I am using the free version of Render to host the game server, it will automatically spin itself down after some inactivity.
  * The first time you use the app, you may have to wait 30-60 seconds for the server to spin back up.
  * You will know the server is up and running if you click "Host Game" and a 4-letter code is displayed.
    
* If the `live-server` command does not work on your local machine, you may need to install the live-server package
```
$ npm install -g live-server
````

### Main Page
![image](https://github.com/shawn8913/brain-blitz/assets/119635447/975e0918-955a-42c2-8533-69996e6c57da)

### Quiz Page
![image](https://github.com/shawn8913/brain-blitz/assets/119635447/f41bb956-4d38-416c-88b2-d90982d3a65f)

### Check Answers Page
![image](https://github.com/shawn8913/brain-blitz/assets/119635447/53c8c2a9-41d5-4502-aab8-c0063a7a1c34)

### Host Page
![image](https://github.com/shawn8913/brain-blitz/assets/119635447/f5e31b94-db77-416a-92ae-b63520a11bc6)

### Join Page
![image](https://github.com/shawn8913/brain-blitz/assets/119635447/fc3aa9c9-ef82-4812-8919-57d1aeb128c8)

### Results Page
![image](https://github.com/shawn8913/brain-blitz/assets/119635447/d87d5e6d-417c-4c7e-8adb-dbffba4a4f04)

# Authors
* [Shawn Liu](https://github.com/shawn8913)

# Acknowledgements:
* [Scrimba Frontend Career Path](https://scrimba.com/learn/frontend)

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Html.js]: https://img.shields.io/badge/html-20232A?style=for-the-badge&logo=html5
[Html-url]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics
[CSS.js]: https://img.shields.io/badge/css-20232A?style=for-the-badge&logo=css3
[CSS-url]: https://developer.mozilla.org/en-US/docs/Web/CSS
[Socket.js]: https://img.shields.io/badge/Socket.io-20232A?style=for-the-badge&logo=socketdotio&logoColor=61DAFB
[Socket-url]: https://socket.io/
[Express.js]: https://img.shields.io/badge/Express-20232A?style=for-the-badge&logo=express
[Express-url]: https://expressjs.com/
[Webpack.js]: https://img.shields.io/badge/Webpack-20232A?style=for-the-badge&logo=webpack
[Webpack-url]: https://webpack.js.org/
[Netlify.js]: https://img.shields.io/badge/Netlify-20232A?style=for-the-badge&logo=netlify
[Netlify-url]: https://www.netlify.com/
[Heroku.js]: https://img.shields.io/badge/Heroku-20232A?style=for-the-badge&logo=heroku
[Heroku-url]: https://dashboard.heroku.com/
