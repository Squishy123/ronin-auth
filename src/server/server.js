const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
global.fetch = require("node-fetch");
global.navigator = () => null;

import RouteLoader from "./modules/routeLoader";
import connectMongo from "./modules/connectMongo";
import getJwks from "./modules/getJwks";

//load env vars
if (process.env.NODE_ENV == "development") require("custom-env").env("dev");

if (process.env.NODE_ENV == "production") require("custom-env").env("prod");

let server = express();

// allow cross origin requests
server.use(cors());
// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
server.use(bodyParser.json());

//load cognito auth information
const cognitoPoolData = {
  UserPoolId: process.env.COGNITO_USER_POOL_ID,
  ClientId: process.env.COGNITO_CLIENT_ID
};

//init cognito userpool
const userPool = new AmazonCognitoIdentity.CognitoUserPool(cognitoPoolData);

const cognitoData = {
  userPool: userPool,
  poolRegion: `ca-central-1`,
  poolData: cognitoPoolData
};

(async function() {
  try {
    //connect to mongodb
    await connectMongo();

    //get jwks
    let jwks = await getJwks(cognitoData);
    Object.assign(cognitoData, {keys: jwks.keys});

    //load all routes
    let routeLoader = new RouteLoader(server, {
      dir: path.join(__dirname, "../app/routes"),
      verbose: true,
      strict: true,
      binds: {
        cognitoData
      }
    });
    await routeLoader.loadDir();

    server.listen(3000, function() {
      console.log(`${server.name} listening at http://localhost:3000`);
    });
  } catch (err) {
    console.error(err);
  }
})();
