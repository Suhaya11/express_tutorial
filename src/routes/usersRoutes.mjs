import { Router } from "express";
import { validationResult, query, checkSchema } from "express-validator";
import { mockedUsers } from "../utils/constants.mjs";
import { addUserSchema, VerifyIdSchema } from "../utils/validationSchemas.mjs";
import { handleUserbyId } from "../utils/middlewares.mjs";
import { User } from "../mongoose/schemas/userSchema.mjs";
const router = Router();
router.get(
  "/api/users",
  query("filter")
    .notEmpty()
    .withMessage("query must nt be empty")
    .isLength({ min: 3, max: 10 })
    .withMessage("qurery must be b/w 1 to 10")
    .isString()
    .withMessage("query must be string"),
  (request, response) => {
    const result = validationResult(request);
    console.log(result);
    // console.log(request.query);
    const {
      query: { filter, value },
    } = request;
    if (filter && value) {
      const desiredUsers = mockedUsers.filter((user) =>
        user[filter].includes(value),
      );

      return desiredUsers.length
        ? response.send(desiredUsers)
        : response.send("USer not on the list");
    }
    response.send(mockedUsers);
  },
);

router.post(
  "/api/users",
  // [
  //   body("name")
  //     .isString()
  //     .withMessage("name must be string")
  //     .notEmpty()
  //     .withMessage("name must not be empty")
  //     .isLength({ min: 3, max: 20 })
  //     .withMessage(
  //       "name must be not less than 3 chars and not more that 20 chars",
  //     ),
  //   body("displayName").notEmpty(),
  // ],
  // checkSchema(addUserSchema),
  async (req, res) => {
    // const result = validationResult(req);
    // console.log(result);

    // if (!result.isEmpty()) return res.status(400).send(result.array());
    const body = req.body;
    const newId = mockedUsers[mockedUsers.length - 1].id + 1;
    const newUser = { id: newId, ...body };
    const theUser = new User(newUser)

    try{
     const savedUser= await theUser.save()
     console.log(savedUser)
      mockedUsers.push(newUser);
      
    res.status(201).send(mockedUsers); 
    }catch(err){
      console.log(err)
      return res.sendStatus(400)
    }
   
  },
);

router.delete(
  "/api/users/:id",
  handleUserbyId,
  checkSchema(VerifyIdSchema),
  (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty())
      return res.status(400).send("invalid verification result");

    const { findIndex } = req;
    mockedUsers.splice(findIndex, 1);
    return res.sendStatus(200);
  },
);

router.get(
  "/api/users/:id",
  handleUserbyId,
  checkSchema(VerifyIdSchema),
  (request, response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.sendStatus(400);
    const { findIndex } = request;
    const theUser = mockedUsers.find((user) => user.id === findIndex);
    if (!theUser.id) return response.sendStatus(404);
    return response.send(mockedUsers[findIndex]);
  },
);

//put
router.put(
  "/api/users/:id",
  handleUserbyId,
  checkSchema(VerifyIdSchema),
  (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.sendStatus(400);
    const { body, findIndex } = req;

    mockedUsers[findIndex] = { id: mockedUsers[findIndex].id, ...body };
    return res.sendStatus(200);
  },
);
// Patch
router.patch(
  "/api/users/:id",
  checkSchema(VerifyIdSchema),
  handleUserbyId,
  (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty) return res.sendStatus(400);
    const { body, findIndex } = req;

    mockedUsers[findIndex] = { ...mockedUsers[findIndex], ...body };
    res.sendStatus(204);
  },
);
export default router;
