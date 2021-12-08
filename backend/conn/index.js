const mongoose = require("mongoose");

async function Conn() {
  await mongoose
    .connect(process.env.MONGODB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB is now connected");
    })
    .catch((err) => console.log(err));
}

module.exports = Conn;
