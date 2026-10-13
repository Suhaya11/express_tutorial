import { Router } from "express";
import { cartAddingSchema } from "../utils/validationSchemas.mjs";
import { checkSchema, validationResult } from "express-validator";
import { mockedProducts } from "../utils/constants.mjs";
const router = Router();

router.post("/api/cart/add", checkSchema(cartAddingSchema), (req, res) => {
  // first check if the user is authenticated
  console.log(req.session.user);

  if (!req.session?.user?.username) return res.sendStatus(401);
  if (!req.session?.user?.cart?.length) req.session.user.cart = [];
  const result = validationResult(req);
  if (!result.isEmpty())
    return res.status(401).send({ error: result.errors.at(0).msg });
  const {
    body: { title },
  } = req;
  const item = mockedProducts.find((itm) => itm.title === title);
  if (!item?.id) return res.sendStatus(404);
  req.session.user.cart.push(item);
  return res.status(201).send({
    addedItem: item,
    AllItems: req.session.user.cart,
  });
});
router.get("/api/cart/view", (req, res) => {
  // first check if the user is authenticated
  if (!req.session.user?.username) return res.sendStatus(401);
  if (!req.session.user.cart.length)
    return res.status(200).send({ msg: "Not items in the cart" });
  return res.status(200).send(req.session.user.cart);
});
export default router;
