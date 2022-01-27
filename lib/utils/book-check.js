module.exports = (book) => {
  if (!book) {
    const error = new Error('book not found');
    error.status = 404;
    throw error;
  }
};
