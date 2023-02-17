// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const PORT = process.env.PORT || 8080;
const app = express();
let cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ['red rabbits juggling orange juice'],
}));
app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  next();
});
app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// to direct images (server knows where to get images)
app.use(express.static(__dirname + '/public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const homeRoutes = require('./routes/home-routes');
const resourcesRoutes = require('./routes/resources');
const resourcesApiRoutes = require('./routes/resources-api.js');

const commentsApiRoutes = require('./routes/comments-api')
const likesApiRoutes = require('./routes/likes-api');
const loginRoute = require('./routes/login-route')
const registerRoute = require('./routes/register-route')
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/api/home', homeRoutes);
app.use('/resources', resourcesRoutes);
app.use('/api/resources', resourcesApiRoutes);


app.use('/api/comments', commentsApiRoutes);
app.use('/api/likes', likesApiRoutes);
app.use('/api/login', loginRoute)
app.use('/api/register', registerRoute)

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  const templateVars = {user:req.session.user,
    hideUserButtons: false };
  res.render('index', templateVars);
});

app.get('/login', (req, res) => {
  res.render('login', { hideUserButtons: true,
  hideSearchButton: true });
});

app.get('/register', (req, res) => {
  res.render('register', {
    hideUserButtons: true,
    error: undefined });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

