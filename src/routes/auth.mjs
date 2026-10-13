import { Router } from "express";
import { checkSchema, validationResult } from "express-validator";
import { userLogingSchema } from "../utils/validationSchemas.mjs";
import { mockedUsers } from "../utils/constants.mjs";
import "../stratagies/local-stratagy.mjs";
import passport from "passport";
// auth paractice with session
const router = Router();
router.post(
  "/api/auth",
  passport.authenticate("local"),
  // checkSchema(userLogingSchema),
  (req, res) => {
    return res.sendStatus(200);
    //   const result = validationResult(req);
    //   if (!result.isEmpty())
    //     return res.status(401).send({ error: result.errors.at(0).msg });
    //   const {
    //     body: { username, password },
    //   } = req;
    //   const findUser = mockedUsers.find((user) => user.username === username);
    //   if (!findUser || findUser.password !== password)
    //     return res.status(401).send({ error: "wrong credentials" });
    //   req.session.user = findUser;
    //   res.status(201).send(findUser);
  },
);
router.get("/api/auth/status", (req, res) => {
  if (!req.user) return res.sendStatus(401);
  res.status(200).send(req.user);
});
router.post("/api/auth/logout", (req, res) => {
  console.log(req);

  if (!req.user) return res.sendStatus(401);
  req.logout((err) => (err ? res.sendStatus(400) : res.sendStatus(200)));
});
export default router;
