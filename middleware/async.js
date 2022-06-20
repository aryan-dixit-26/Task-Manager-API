//Since we are doing redundant work in controller by repeatedly calling try and catch we create this middleware to get rid of the redundancy

const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
export default asyncWrapper;
