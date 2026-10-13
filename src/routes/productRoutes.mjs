import { Router } from "express";
import { mockedProducts } from "../utils/constants.mjs";
import session from "express-session";
const router = Router();
router.use(
  session({
    secret: "trying from products endpoint",
    visited: true,
    cookie: { maxAge: 300000 },
    saveUninitialized: false,
    resave: false,
  }),
);
router.get("/api/products/", (request, response) => {
  // console.log( request.session);
  request.session.visited = true;
  console.log("this is from products", request.session.id);
  // console.log(request.signedCookies);
  // console.log(request.headers.cookie);
  request.sessionStore.get(request.sessionID, (err, sessionData) => {
    if (err) {
      console.log(err);
      throw err;
    } else console.log(sessionData);
  });
  if (request.signedCookies.heloo == "world")
    return response.send(mockedProducts);
  return response
    .status(401)
    .send(
      "Incorrect cookies detected please reauthenticate for security purposes",
    );
});
export default router;
