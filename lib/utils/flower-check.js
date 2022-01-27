module.exports = (flower) => {
  if (!flower) {
    const error = new Error('flower not found');
    error.status = 404;
    throw error;
  }
};
