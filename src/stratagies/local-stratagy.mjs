import passport from "passport";
import { Strategy } from "passport-local";
import { mockedUsers } from "../utils/constants.mjs";

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err, null);
  }
});
passport.deserializeUser((id, done) => {
  try {
    const finduser = mockedUsers.find((user) => user.id === id);
    if (!finduser) throw new Error("user not found");
    done(null, finduser);
  } catch (err) {
    done(err, null);
  }
});
export default passport.use(
  new Strategy((username, password, done) => {
    console.log("username", username);
    console.log("password", password);

    try {
      const finduser = mockedUsers.find((user) => user.username === username);
      if (!finduser) throw new Error("user not found");
      if (finduser.password !== password)
        throw new Error("invalid credentials");
      done(null, finduser);
    } catch (err) {
      done(err, null);
    }
  }),
);
