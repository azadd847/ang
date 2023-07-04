const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors"); //api
mongoose.set('strictQuery', true);
// mongoose bağlantısı için async fonksiyon tanımlıyoruz
const connectToMongo = async () => {
  try {
    // mongoose bağlantısını bekliyoruz
    await mongoose.connect(
      "mongodb://localhost:27017/dbcustomer",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    // bağlantı başarılıysa bir mesaj yazdırıyoruz
    console.log("DB Connectedddd!!!!!!!!!!!");
  } catch (error) {
    // bağlantı başarısızsa hatayı yazdırıyoruz
    console.log(error);
  }
};

// mongoose bağlantısını çağırıyoruz
connectToMongo();

app.listen(8086, function port(error) {
  if (error) {
    console.log(error);
  } else {
    console.log("Port Connectedddd!!!!!!!!!!! on port"  );
  }
});

app.use(cors());
app.use(express.json());


