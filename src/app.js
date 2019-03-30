import "dotenv/config";
import Hapi from "hapi";
import Mongoose from "mongoose";
import routes from "./routes";

Mongoose.connect(process.env.MONGO_CONNECTION_STR);

var db = Mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    // we're connected!
    console.log("Mongo is going");
});

const server = Hapi.server({
    port: process.env.HAPI_PORT,
    host: process.env.HAPI_HOST
});

for (const route in routes) {
    server.route(routes[route]);
}

module.exports = server;

const init = async () => {
    await server.register({
        plugin: require("hapi-pino"),
        options: {
            prettyPrint: false,
            logEvents: ["response", "onPostStart"]
        }
    });

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on("unhandledRejection", err => {
    console.log(err);
    process.exit(1);
});

init();
