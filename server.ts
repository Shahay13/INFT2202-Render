/*
 * File: server.ts
 * Author: Takirul
 * Date: March 28, 2024
 * Description: This server configuration file sets up a basic HTTP server that serves files from the local directory.
 * It listens on a port specified by the environment or defaults to 3000. It handles basic routing for the
 * home page and serves files with appropriate MIME types.
 */

"use strict";

// Import the HTTP module to create an HTTP server.
import http from 'http';

// Import the File System module to read files from the system.
import fs from 'fs';

// Import the mime-types library to determine MIME types based on file extensions.
import mime from 'mime-types';

// Alias for the mime.lookup function for convenience.
let lookup = mime.lookup;

// Read a port environment variable that was set. Default to port 3000.
const port = process.env.PORT || 3000;

// Create an HTTP server that responds to all requests.
const server = http.createServer((req,
                                  res) => {

    // Define the path for the requested resource.
    let path = req.url as string;

    // Default to the home page if root is requested.
    if (path === "/" || path === "/home"){
        path = "/index.html";
    }

    // Determine the MIME type of the requested resource.
    let mime_type = lookup(path.substring(1)) as string;

    // Attempt to read the requested file from the system.
    fs.readFile(__dirname + path, function(err, data){

        // Respond with a 404 error if the file is not found.
       if (err) {
           res.writeHead(404);
           res.end("Error 404 - File Not Found " + err.message);
           return;
       }

        // Use a default MIME type if one cannot be determined from the file extension.
       if (!mime_type) {
           mime_type = "text/plain";
       }

        // Serve the file data with the appropriate MIME type and security headers.
       res.setHeader("X-Content-Type-Options", "nosniff");
       res.writeHead(200, {'Content-Type': mime_type});
       res.end(data);

    });
});

// Start the server and listen on the specified port. Log a message to the console upon starting.
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
