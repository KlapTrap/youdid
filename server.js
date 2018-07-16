const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
var morgan = require('morgan');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

var proxy = require('http-proxy-middleware');

// proxy middleware options
var options = {
  changeOrigin: true, // needed for virtual hosted sites
  onProxyReq: (proxyReq, req, res) => {
    console.log(req.get('host'), req.url)
    // proxyReq.setHeader('Authorization', `bearer ${process.env.GITHUB_APP_TOKEN}`); // add new header to response
  },
  headers: {
    'Authorization': `bearer ${process.env.GITHUB_APP_TOKEN}`
  },
  logLevel: 'debug'
};

// create the proxy (without context)
var restProxy = proxy({
  ...options,
  target: `https://api.github.com`,
  pathRewrite: {
    '^/github-api': '/'
  }
});
var graphQlProxy = proxy({
  ...options,
  target: `https://api.github.com/graphql`,
  pathRewrite: {
    '^/github-graphql': ''
  }
});

// create the express app
const app = express();

// create "middleware"
var logger = morgan('combined');
app.use(logger);
app.use('/github-api', restProxy);
app.use('/github-graphql', graphQlProxy);
// create middleware to handle the serving the app
app.use('/', serveStatic(path.join(__dirname, '/dist')));
// Create default port to serve the app on
const port = process.env.PORT || 5000;
app.listen(port);
// Log a feedback that this is actually running
console.log('Server started on port ' + port);
