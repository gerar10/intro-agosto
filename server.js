const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;
const password = process.env.PASSWORD_MONGO;
const dbUser = process.env.USER_MONGO;

const url = `mongodb+srv://${dbUser}:${password}@cluster0.kttc6we.mongodb.net/?retryWrites=true&w=majority`;

const routes = require("./routes/index");

app.use(express.json());
app.use(cookieParser());

// app.use(express.static(path.join(__dirname, "public")));

app.use(
  express.static("public", {
    setHeaders: (res, path) => {
      if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      }
    },
  })
);

app.use("/", routes);

const connectMongo = async () => {
  try {
    await mongoose.connect(url);
    app.listen(PORT, () => {
      console.log(
        `Servidor escuchando en el puerto ${PORT} y la base de datos conectada`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

connectMongo();
