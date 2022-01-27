module.exports = (dog) => {
  if (!dog) {
    const error = new Error('dog not found');
    error.status = 404;
    throw error;
  }
};
