import express from "express";
import crypto from 'crypto';
globalThis.crypto = crypto;

import myRouter from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
const app = express();
mongoose
  .connect("mongodb://localhost/express_tutorial")
  .then(() => console.log("connected to mongo db"))
  .catch((er) => console.log("error", err));
mongoose
  .connect("mongodb://localhost/express_tutorial")
  .then(() => console.log("connected to mongo db"))
  .catch((er) => console.log("error", er));
app.use(express.json());
app.use(cookieParser("sulaimanhaladuyau"));
app.use(
  session({
    secret: "sulaiman haladu yau",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());
app.use(myRouter);
const PORT = process.env.PORT || 3000;

// get the home page i.e /
app.get("/", (request, response) => {
  // console.log(request.session);
  console.log("this is from homepage", request.sessionID);
  request.session.visited = true;
  response.cookie("heloo", "world", { maxAge: 300000, signed: true });
  response.cookie(
    "trial",
    "I'm trying to send two cookies from one endpoint to see how it'll be",
    { signed: true },
  );
  response.send("HEllo world , Hi suhaya your welcome to express");
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
