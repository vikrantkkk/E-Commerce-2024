import { isValidObjectId } from "mongoose";

const checkId = (req,res, next) => {
  if (!isValidObjectId(req.params.id)) {
    res.status(400);
    throw new Error(`invalid object of ${req.params.id}`);
  }
  next();
};

export default checkId;
