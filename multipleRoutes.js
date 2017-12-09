// Require/import the HTTP module
var http = require("http");
var fs = require("fs");

// Define a port to listen for incoming requests
var PORT1 = 7000;

// Create a generic function to handle requests and responses
function handleRequest(req, res) {

  //console.log(req);
  // Capture the url the request is made to
  var path = req.url;

  var filePath = path + ".html";

  // Depending on the URL, display a different HTML file.
  switch (path) {

    case "/":
      return openPage("/home.html", req, res)

    case "/favoriteCSS":
      return openPage(filePath, req, res)

    case "/favoriteMovies":
      return openPage(filePath, req, res)

    case "/favoriteFoods":
      return openPage(filePath, req, res)

    default:
      return display404(path, req, res);
  }
}

function openPage(path, req, res) {
  fs.readFile(__dirname + path, function (err, data) {

    // We then respond to the client with the HTML page by specifically telling the browser that we are delivering
    // an html file.
    res.writeHead(200, {
      "Content-Type": "text/html"
    });
    res.end(data);
  });
}
// When someone visits any path that is not specifically defined, this function is run.
function display404(url, req, res) {
  var myHTML = "<html>" +
    "<body><h1>404 Not Found </h1>" +
    "<p>The page you were looking for: " + url + " can not be found</p>" +
    "</body></html>";

  res.writeHead(404, {
    "Content-Type": "text/html"
  });
  res.end(myHTML);
}

// Use the Node HTTP package to create our server.
// Pass the handleRequest function to empower it with functionality.
var server1 = http.createServer(handleRequest);

// Start our server so that it can begin listening to client requests.
server1.listen(PORT1, function () {

  // Log (server-side) when our server has started
  console.log("Server One listening on: http://localhost:" + PORT1);
});