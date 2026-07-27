const http = require("http");
const url = require("url");
const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to my Node.js Server!");
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
    <h1>About This Server</h1>
    <p>This is my first Node.js web server, built without any external frameworks.</p>
    <p>Created by: Oi Don hooooooooo</p>
  `);
  } else if (req.url === "/api/student") {
    const student = {
      name: "John",
      course: "Web Development",
      semester: 5,
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(student));
  } else if (req.url === "/contact") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
    <h1>Contact Me</h1>
    <p>Email: your.email@example.com</p>
    <p>Phone: +1 234 567 8900</p>
  `);
  } else if (req.url === "/api/time") {
    const timeData = { currentTime: new Date().toISOString() };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(timeData));
  } else if (req.url === "/api/random") {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ randomNumber }));
  } // add this import at the top of server.js

  // inside the route handling logic:
  else if (req.url.startsWith("/hello")) {
    const parsedUrl = url.parse(req.url, true);
    const name = parsedUrl.query.name || "Guest";

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Hello, ${name}!`);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 - Page Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
