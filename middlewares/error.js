export const errorHandler = (
  res,
  statusCode = 500,
  message = "Internal Server Error"
) => {
  console.log(message);
  return res.status(statusCode).json({
    success: false,
    message,
  });
};
export const asyncError = (passedFunc) => (req, res) => {
  return Promise.resolve(passedFunc(req, res)).catch((err) => {
    console.log(err);
    return errorHandler(res, 500, err.message);
  });
};
