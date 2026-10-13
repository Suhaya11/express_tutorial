import { mockedUsers } from "./constants.mjs";
export const handleUserbyId = (req, res, next) => {
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findIndex = mockedUsers.findIndex((user) => user.id === parsedId);
  if (findIndex == -1) return res.sendStatus(404);
  req.findIndex = findIndex;
  next();
};
