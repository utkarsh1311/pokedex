const app = require("./app");
const http = require("http");

// Path: server/index.js

// const express = require('express');
// const app = express();
//
const server = http.createServer(app);
server.listen(3000, () => {
	console.log("App running on port 3000");
});
