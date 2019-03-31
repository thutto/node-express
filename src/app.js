import "dotenv/config";
import Express from "express";
import bodyParser from "body-parser";
import Morgan from "morgan";
import Mongoose from "mongoose";
import routes from "./routes";

Mongoose.connect(process.env.MONGO_CONNECTION_STR);

var db = Mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    // we're connected!
    console.log("Mongo is going");
});

const server = Express();
server.use(Morgan('combined'));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());


// Add All routes;
routes['note.routes'].routes.forEach((route) => {
    switch (route.method) {
        case "GET":
            server.get(route.path, route.handler);
            break;
        case "PUT":
            server.put(route.path, route.handler);
            break;
        case "POST":
            server.post(route.path, route.handler);
            break;
        case "DELETE":
            server.delete(route.path, route.handler);
            break;
        default:
            console.log(`Unsupported : ${route.method}, for Path: ${route.path}.`);
    }
});

server.listen(process.env.EXPRESS_PORT, () => console.log(`Example app listening on port ${process.env.EXPRESS_PORT}!`));
module.exports = server;
