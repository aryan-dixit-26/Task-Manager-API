import { CustromAPIError } from "../errors/custom-error.js";
const errorHandler = (err, req, res, next) => {
  // The error from the next of asyncWrappers next(error) will be handled here as it the next middleware which is receiving the error.
  if (err instanceof CustromAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(500).json({ msg: "Something went wrong" });
};

export default errorHandler;
