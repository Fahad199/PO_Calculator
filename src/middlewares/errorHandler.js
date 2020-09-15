const ValidationError = (message, err, res) => res.status(400).json({
  message,
  error: err.details[0].message,
});

const ResourceConflictError = (err, res) => res.status(409).json({
  [err.name]: err.errors[0].message,
});

const NotFoundError = (message, res) => res.status(404).json({
  message,
});

module.exports = {
  ValidationError,
  ResourceConflictError,
  NotFoundError,
};
