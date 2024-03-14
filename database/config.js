const mongoose = require('mongoose');

const dbConncection = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_LINK);
    console.log('DB online');
  } catch (error) {
    console.log(error);
    throw new Error('Error trying to initialize the DB');
  }
};

module.exports = { dbConncection };
