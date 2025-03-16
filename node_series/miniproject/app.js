import { readFile } from "fs/promises";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const PORT = 4000;

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = createServer(async (req, res) => {
  // Check if the request method is GET
  if (req.method === "GET") {
    // Handle root route
    if (req.url === "/") {
      try {
        const data = await readFile(
          path.join(__dirname, "public", "index.html")
        );
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      } catch (error) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>404 - Page Not Found</h1>");
      }
    }
    // Handle request for style.css
    else if (req.url === "/style.css") {
      try {
        const data = await readFile(
          path.join(__dirname, "public", "style.css")
        );
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(data);
      } catch (error) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>404 - CSS File Not Found</h1>");
      }
    }
    // Handle unknown routes
    else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>404 - Page Not Found</h1>");
    }
  }
  // Handle unsupported methods
  else {
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("405 - Method Not Allowed");
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
