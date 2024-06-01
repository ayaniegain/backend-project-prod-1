const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message,
    });
  }
};

export {asyncHandler}