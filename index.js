import { parse } from "querystring";
import * as data from './data.js';
import http from 'http';

//const http = require("http");
http.createServer((req,res) => {
    let url = req.url.split("?");  // separate route from query string
    let query = parse(url[1]); // convert query string to object
    let path = url[0].toLowerCase();
    switch(path) {
        case '/':
            let findAll = data.getAll(query.humans); // get entire array of humans
            res.writeHead(200, {'Content-Type': 'text/plain'});
            let Allresults = (findAll) ? JSON.stringify(findAll) : "Not found";
            res.end("Entire array of humans" + " \n " + Allresults);
            break;
        case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('I really want to pass this class');
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not found');
            break;
        case '/details':
            let findColor = data.getItem(query.color); // returns the object of the corresponding color 
            res.writeHead(200, {'Content-Type': 'text/plain'});
            let ColorResult = (findColor) ? JSON.stringify(findColor) : "Not found";
            // EXAMPLE http://localhost:3000/details?color=blue
            res.end("the array object of the corresponding color" + "\n" + ColorResult);
            break;
    }
}).listen(process.env.PORT || 3000);

console.log('Server running at http://127.0.0.1:3000/');