const mongoose = require("mongoose");

async function connectToDB() {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log(
      `Mongo DB Connected! Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("DB connection failed! - ", error);
  }
}

module.exports = { connectToDB };
