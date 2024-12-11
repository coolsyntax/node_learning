const http = require("http");
const fs = require("fs");
const path = require("path");

// below imports give error because server.js is not a module instead it should be server.mjs
//import fs from "fs";
//import path from "path";

const port = 3000;

const server = http.createServer((req, res) => {
  const filePath = path.join(
    __dirname,
    req.url === "/" ? "index.html" : req.url
  );
  console.log(filePath);

  const extensionName = String(path.extname(filePath)).toLocaleLowerCase();

  const mimeType = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".json": "text/json",
  };

  const contentType = mimeType[extensionName] || "application/octet-stream";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(400, { "Content-Type": "text/html" });
      res.end(`400 : Something went wrong bhai \n ${err}`);
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data, "utf-8");
    }
  });
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// createServer(requestListener?: http.RequestListener<typeof http.IncomingMessage, typeof http.ServerResponse> | undefined): http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>

// Returns a new instance of Server.

// The requestListener is a function which is automatically added to the 'request' event.

// import http from 'node:http';

// // Create a local server to receive data from
// const server = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'application/json' });
//   res.end(JSON.stringify({
//     data: 'Hello World!',
//   }));
// });

// server.listen(8000);
// import http from 'node:http';

// // Create a local server to receive data from
// const server = http.createServer();

// // Listen to the request event
// server.on('request', (request, res) => {
//   res.writeHead(200, { 'Content-Type': 'application/json' });
//   res.end(JSON.stringify({
//     data: 'Hello World!',
//   }));
// });

// server.listen(8000);
// @since — v0.1.13
