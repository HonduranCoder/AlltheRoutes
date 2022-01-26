module.exports = (movie) => {
  if (!movie) {
    const error = new Error('movie not found');
    error.status = 404;
    throw error;
  }
};
