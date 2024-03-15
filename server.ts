"use strict";

import http from 'http';
import fs from 'fs';
import mime from 'mime-types';

let lookup = mime.lookup;

// Read a port environment variable that was set. Default to port 3000.
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

    let path = req.url as string;

    if(path === "/" || path === "/home"){
        path = "/index.html";
    }

    let mime_type = lookup(path.substring(1)) as string;

    // Read the path.
    fs.readFile(__dirname + path, function(err, data){

       // Write an error message.
       if(err){
           res.writeHead(404);
           res.end("Error 404 - File Not Found " + err.message);
           return;
       }

       // Set a default mime_type if none is present.
       if(!mime_type){
           mime_type = "text/plain";
       }

       // Display the data on the webpage.
       res.setHeader("X-Content-Type-Options", "nosniff");
       res.writeHead(200, {'Content-Type': mime_type});
       res.end(data);

    });
});

// Display a message in the console when the server runs.
server.listen(port, () =>{
    console.log(`Server running at http://localhost:${port}/`);
});
