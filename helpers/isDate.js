const isDate = (value, { req, location, path }) => {
  if (!value) {
    return false;
  }

  if (isNaN(new Date(value))) {
    return false;
  } else {
    return true;
  }
};

module.exports = { isDate };
