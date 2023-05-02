class NoAccsesError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = NoAccsesError;