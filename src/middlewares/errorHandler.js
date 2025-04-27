module.exports = (err, req, res, next) => {
    console.error(err.stack);
  
    const status = err.status || 500;
    const message = err.customMessage || 'internal server error.';
  
    res.status(status).json({ message });
  };
  