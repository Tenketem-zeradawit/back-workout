const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(
      
      "mongodb+srv://tenketem:tkOURItBstNgoimL@book-stort-mert.tvps9.mongodb.net/workout?retryWrites=true&w=majority&appName=Book-Stort-MERT"
    );
    console.log("Database Connected");
  } catch (error) {
    console.error(error);
  }
};
module.exports = connectDatabase;
