const { default: mongoose } = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // console.log(error);
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // process.exit();
  }
};

module.exports = connectDB;
