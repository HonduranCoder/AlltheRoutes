module.exports = (funko) => {
  if (!funko) {
    const error = new Error('funko not found');
    error.status = 404;
    throw error;
  }
};
