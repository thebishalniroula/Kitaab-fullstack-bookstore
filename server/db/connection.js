module.exports.connectdb = (mongoose) =>
  mongoose.connect(process.env.DB_CONNECTION_STRING, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("Connected to database");
  });
